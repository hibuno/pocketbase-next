import { faker } from '@faker-js/faker';
import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090');

// Configuration
const NUM_POSTS = 20; // Number of posts to generate
let userIds = []; // Will store user IDs to use as authors

/**
 * Generate a realistic blog post title
 * @returns {string} A blog post title
 */
function generateTitle() {
	// Generate titles that feel like real blog posts or articles
	const titleFormats = [
		() => `${faker.word.adjective()} ${faker.word.noun()} ${faker.word.verb()}s ${faker.word.noun()}`,
		() => `The ${faker.number.int({ min: 3, max: 15 })} ${faker.word.adjective()} Ways to ${faker.word.verb()} Your ${faker.word.noun()}`,
		() => `Why ${faker.word.verb({ strategy: 'any-case' })}ing ${faker.word.noun()} Is ${faker.word.adjective()}`,
		() => `${faker.word.verb({ strategy: 'any-case' })} Your ${faker.word.noun()} With These ${faker.word.adjective()} Tips`,
		() => `${faker.company.buzzNoun()}: The Future of ${faker.company.buzzVerb()}`,
		() => faker.company.catchPhrase(),
		() => `${faker.word.adjective({ length: { min: 5, max: 10 } })} ${faker.word.noun()} ${faker.word.verb()}s ${faker.hacker.noun()}`,
	];

	const randomFormat = faker.helpers.arrayElement(titleFormats);
	return randomFormat();
}

/**
 * Generate a realistic excerpt for a blog post
 * @param {string} content - The full content to excerpt from
 * @returns {string} A blog post excerpt
 */
function generateExcerpt(content) {
	// Take first 150 characters and trim to the last complete sentence
	const excerpt = content.substring(0, 150);
	const lastPeriod = excerpt.lastIndexOf('.');

	if (lastPeriod > 0) {
		return excerpt.substring(0, lastPeriod + 1);
	}

	return excerpt + '...';
}

/**
 * Generate realistic content for a blog post
 * @returns {string} HTML formatted blog post content
 */
function generateContent() {
	// Generate a coherent blog post with paragraphs, headings, and some formatting
	const paragraphs = faker.helpers.multiple(
		() => faker.lorem.paragraph(faker.number.int({ min: 3, max: 8 })),
		{ count: { min: 3, max: 7 } }
	);

	// Add a heading between some paragraphs
	const headingIndex = faker.number.int({ min: 1, max: paragraphs.length - 1 });
	const heading = `<h2>${faker.company.catchPhrase()}</h2>`;

	// Add a blockquote for interest
	const quoteIndex = faker.number.int({ min: 0, max: paragraphs.length - 1 });
	paragraphs[quoteIndex] = `<blockquote>${faker.lorem.sentence(10)}</blockquote>${paragraphs[quoteIndex]}`;

	// Insert heading
	paragraphs.splice(headingIndex, 0, heading);

	// Add some formatting to random sentences
	const formattedContent = paragraphs.map(paragraph => {
		// Randomly bold or italicize some text
		if (faker.number.int(10) > 7) {
			const words = paragraph.split(' ');
			const startPos = faker.number.int({ min: 0, max: words.length - 3 });
			const endPos = faker.number.int({ min: startPos + 1, max: Math.min(startPos + 3, words.length - 1) });

			const formatting = faker.helpers.arrayElement(['<strong>', '<em>']);
			const closingTag = formatting === '<strong>' ? '</strong>' : '</em>';

			words[startPos] = formatting + words[startPos];
			words[endPos] = words[endPos] + closingTag;

			return words.join(' ');
		}
		return paragraph;
	});

	// Wrap paragraphs in <p> tags and join
	return formattedContent.map(p => `<p>${p}</p>`).join('\n\n');
}

/**
 * Fetch existing users to use as authors
 * @returns {Promise<string[]>} Array of user IDs
 */
async function fetchUsers() {
	try {
		// Authenticate as admin (you need to provide admin credentials)
		// For a real application, store these securely in environment variables
		await pb.admins.authWithPassword(
			process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com',
			process.env.POCKETBASE_ADMIN_PASSWORD || 'your-admin-password'
		);

		// Fetch users
		const users = await pb.collection('users').getList(1, 50);

		if (users.items.length === 0) {
			console.warn('No users found. Creating posts with random IDs as authors.');
			// Generate some fake user IDs if no real ones exist
			return Array(5).fill().map(() => faker.string.alphanumeric(15));
		}

		return users.items.map(user => user.id);
	} catch (error) {
		console.error('Error fetching users:', error);
		// Generate some fake user IDs as fallback
		return Array(5).fill().map(() => faker.string.alphanumeric(15));
	}
}

/**
 * Create posts with realistic data
 * @returns {Promise<void>}
 */
async function seedPosts() {
	try {
		// Fetch users to use as authors
		userIds = await fetchUsers();

		console.log(`Creating ${NUM_POSTS} posts...`);

		// Create posts
		for (let i = 0; i < NUM_POSTS; i++) {
			// Generate realistic content
			const content = generateContent();
			const title = generateTitle();
			const excerpt = generateExcerpt(content);

			// Prepare post data
			const postData = {
				author: faker.helpers.arrayElement(userIds),
				title,
				excerpt,
				content
			};

			// Create the post
			const record = await pb.collection('posts').create(postData);
			console.log(`Created post: ${record.id} - ${record.title}`);
		}

		console.log('Seeding completed successfully!');
	} catch (error) {
		console.error('Error seeding posts:', error);
	}
}

// Run the seeder
seedPosts().then(() => {
	console.log('Done!');
	process.exit(0);
}).catch(error => {
	console.error('Fatal error:', error);
	process.exit(1);
});
