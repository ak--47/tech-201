/**
 * @fileoverview This is the Tech 201 Series in which we go deeper into concepts in technology. This lesson is on data structures, where we discuss how simple primitives can be used to create complex data structures which model facts in the real world.
 * @author AK
 * 
 */


const sep = () => console.log("- - -\n");
const bigSep = () => console.log("\n============================\n");

// MODULE 0: PRIMITIVES
(function a_review_of_primitives() {
	bigSep();
	console.log('🧱 LESSON 0: A Review of Primitives\n\tthis is all there is!');
	sep();
	// Primitives are the most basic data types in JavaScript.
	// They include: string, number, boolean, null, undefined, and symbol.
	// Each primitive represents a single value and has immutable characteristics.
	console.log('📝 TEXT DATA:');
	const aString = "Hello, World!";
	console.log("   📄 Strings look like this:", aString);
	
	console.log('🔢 NUMERIC DATA:');
	const aNumber = 42;
	console.log("   🎯 Numbers look like this:", aNumber);
	
	console.log('✅ TRUE/FALSE DATA:');
	const aBoolean = true;
	console.log("   ⚡ Booleans look like this:", aBoolean);
	sep();

	// some languages will have different representations for "empty" state
	console.log('🕳️  EMPTY DATA:');
	const aNull = null;
	console.log("   ⭕ Null looks like this:", aNull);
	const anUndefined = undefined;
	console.log("   ❓ Undefined looks like this:", anUndefined);
	sep();

	// Symbols are a unique and immutable primitive value that can be used as object property keys.
	console.log('🔑 UNIQUE IDENTIFIERS:');
	const aSymbol = Symbol("unique");
	console.log("   🏷️  Symbols look like this:", aSymbol);
	const anotherSymbol = Symbol("unique");
	console.log("   🆔 Symbols are unique, so `aSymbol` is not equal to `anotherSymbol`:", aSymbol === anotherSymbol);
	// ^ think to yourself... why might 'unique symbols' be a valuable data type?
	sep();

	// we also have BigInt for large integers
	console.log('🚀 SPECIAL NUMBERS:');
	const aBigInt = BigInt(1234567890123456789012345678901234567890);
	console.log("   📏 BigInt looks like this:", aBigInt);
	//and decimals (floats)
	const aFloat = 3.14159;
	console.log("   🥧 Floats look like this:", aFloat);
	// ^ think to yourself... why might numerical precision be critical for every application?
	sep();

	// you can always check the type of a variable using the typeof operator
	console.log('🔍 TYPE CHECKING:');
	console.log(`   📄 String    → "${typeof aString}"`);
	console.log(`   🎯 Number    → "${typeof aNumber}"`);
	console.log(`   ⚡ Boolean   → "${typeof aBoolean}"`);
	console.log(`   ⭕ Null      → "${typeof aNull}"     ⚠️  (this is a JavaScript quirk!)`);
	console.log(`   ❓ Undefined → "${typeof anUndefined}"`);
	console.log(`   🏷️  Symbol    → "${typeof aSymbol}"`);
	console.log(`   📏 BigInt    → "${typeof aBigInt}"`);
	console.log(`   🥧 Float     → "${typeof aFloat}"`);
	// TODO: WISDOM: you never fully understand the problem until you concretely know all the primitives involved ! 
	sep();
})();


// MODULE 1: OBJECTS AND ARRAYS
(function a_review_of_objects_and_arrays() {
	bigSep();
	console.log('📦 LESSON 1: A Review of Objects and Arrays\n\t{} and [] are how we ORGANIZE primitives');
	sep();
	// objects are UNORDERED collections of key:value pairs, where keys are strings (or Symbols) 
	// ? and values can be ANY data type, allowing for nested structures.
	console.log('🗺️  OBJECTS {} - Unordered Key:Value Collections:');
	const anObject = {
		name: "Alice",
		age: 30,
		isStudent: false,
		anotherObject: {}
	};
	console.log("   📦 Objects look like this:", anObject);
	console.log("   🔑 Accessing properties:", `name="${anObject.name}"`, `age=${anObject.age}`, `isStudent=${anObject.isStudent}`);

	sep();

	console.log('📁 ARRAYS [] - Ordered Index:Value Collections:');
	// arrays are ORDERED collections of values at numerical index, which can be of any type.
	const anArray = [1, 2, 3, "four", true];
	console.log("   📦 Arrays look like this:", anArray);
	console.log("   🎯 Accessing elements:", `[0]=${anArray[0]}`, `[3]="${anArray[3]}"`);
	// ^ think: what is the difference between a 'key' (in {}) and an 'index' (in []) ?
	sep();


	// importantly, arrays can also contain objects, which is foundational to how we model 'collections of things'
	console.log('👥 ARRAYS OF OBJECTS - Real-World Data Structures:');
	const anArrayOfObjects = [
		{ name: "Charlie", age: 25 },
		{ name: "Diana", age: 28 }		
	];
	console.log("   📦 Array of Objects:", anArrayOfObjects);
	console.log("   🔗 Accessing nested data:", `[0].name="${anArrayOfObjects[0].name}"`, `[1].age=${anArrayOfObjects[1].age}`);
	sep();

	// You can also use methods to manipulate objects and arrays.
	console.log('⚙️  METHODS & MANIPULATION:');
	anObject.greet = function () {
		return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
	};
	console.log("   🗣️  Object method:", anObject.greet());
	anArray.push("new item");
	console.log("   ➕ Array after push():", anArray);
	sep();

	console.log('⚠️  KEY DIFFERENCE:');
	console.log("   🗺️  Objects (UNORDERED):", Object.keys(anObject), '← keys can be in any order!');
	console.log("   📁 Arrays (ORDERED):  ", anArray.map((item, index) => `[${index}]=${item}`), '← always same order!');
	// TODO: WISDOM: when would you need an UNORDERED collection vs an ORDERED collection? critical decision in data modeling!
	sep();
})();


// MODULE 2: DATA FORMATS
(function different_data_formats() {
	bigSep();
	console.log('LESSON 2: Different Data Formats\n\tformats like JSON, XML, CSV, and YAML are (mostly) interchangeable');
	sep();

	const anObject = {
		name: "Eve",
		age: 22,
		human: true,
		hobbies: ["painting", "cycling"],
	};

	// JSON (JavaScript Object Notation) is a lightweight data interchange format
	const jsonString = JSON.stringify(anObject);
	console.log("JSON String:", jsonString);
	sep();
	const parsedObject = JSON.parse(jsonString);
	console.log("\nParsed Object:", parsedObject);
	sep();

	// XML (eXtensible Markup Language) is another format for data interchange
	const xmlString = json_to_xml(anObject);
	console.log("XML String:\n", xmlString);
	sep();

	console.log('📋 CSV FORMAT (Comma-Separated Values):');
	// CSV (Comma-Separated Values) is a simple format for tabular data
	const csvString = json_to_csv(anObject);
	console.log("   📄 CSV Table:", prettyTable(csvString));
	sep();

	console.log('📑 YAML FORMAT (YAML Ain\'t Markup Language):');
	// YAML (YAML Ain't Markup Language) is a human-readable data serialization format
	const yamlString = json_to_yaml(anObject);
	console.log("   📄 YAML String:");
	console.log(yamlString);
	sep();

	console.log('\n🎯 USE CASES:');
	// Each format has its own use cases and advantages.
	console.log('   📤 JSON: APIs, web apps (fast & simple)');
	console.log('   🏷️  XML:  Legacy systems, SOAP APIs (verbose but structured)');
	console.log('   📋 CSV:  Spreadsheets, reports (simple tables only)');
	console.log('   📑 YAML: Config files, docs (human-readable)');
	// ^ think: why might you choose one format over another? what are the tradeoffs? critical design decision!

	//are they completely interchangeable? let try something more complex
	console.log('\n🧪 COMPLEXITY TEST:');
	console.log("🔗 JSON and XML can represent complex data structures, while CSV is more suited for flat data; let's see an example:\n");
	const complexData = {
		users: [
			{ name: "Alice", age: 30, hobbies: ["reading", "gaming"], address: { city: "Wonderland", zip: "12345" } },
			{ name: "Bob", age: 25, hobbies: ["hiking", "cooking"], address: { city: "Builderland", zip: "67890" } },
			{
				name: "Eve", age: 22, address: {
					city: "Techville", zip: "54321",
					friends: [
						{ name: "Charlie", age: 25 },
						{
							name: "Diana", age: 28, friends: [
								{ name: "Edgar", age: 42 },
								{
									name: "Fiona", age: 30,
									friends: [
										{ name: "George", age: 35 }
									]
								}
							]
						},
						{ name: "Lynn", age: 22 }
					]
				}
			}
		]
	};

	console.log("\n📤 Complex Data in JSON:");
	console.log(JSON.stringify(complexData, null, 2));
	sep();
	// XML can represent this data, but it would be more verbose
	console.log("\n🏷️  Complex Data in XML:");
	console.log(json_to_xml(complexData));
	sep();
	// CSV would not be suitable for this structure as it cannot represent nested objects or arrays
	console.log("📋 Complex Data in CSV (⚠️  gets messy!):");
	console.log(`users/name,users/age,users/hobbies/0,users/hobbies/1,users/address/city,users/address/zip,users/address/friends/0/name,users/address/friends/0/age,users/address/friends/1/name,users/address/friends/1/age,users/address/friends/1/friends/0/name,users/address/friends/1/friends/0/age,users/address/friends/1/friends/1/name,users/address/friends/1/friends/1/age,users/address/friends/1/friends/1/friends/0/name,users/address/friends/1/friends/1/friends/0/age,users/address/friends/2/name,users/address/friends/2/age
Alice,30,reading,gaming,Wonderland,12345,,,,,,,,,,,,
Bob,25,hiking,cooking,Builderland,67890,,,,,,,,,,,,
Eve,22,,,Techville,54321,Charlie,25,Diana,28,Edgar,42,Fiona,30,George,35,Lynn,22
`);
	sep();
	// YAML would be a trip
	console.log("📑 Complex Data in YAML:");
	console.log(json_to_yaml(complexData));
	sep();
	console.log('\n💡 KEY INSIGHT:');
	console.log('   🏆 JSON wins for flexibility + web compatibility');
	console.log('   🌐 Native to JavaScript = the language of the web!');
	// TODO: WISDOM: JSON is the most flexible AND the most verbose data format (it's also native to javascript! the language of the people)
		sep()
})();


// MODULE 3: DATA RELATIONSHIPS AND MODELING
(function data_relationships_and_modeling() {
	bigSep();
	console.log('LESSON 3: Data Relationships and Modeling\n\tHow data connects to represent real-world relationships');
	sep();

	// Let's start with a simple example: a school
	// ONE-TO-ONE: Each student has exactly one student ID
	const students = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" }
	];

	const studentIDs = [
		{ studentId: 1, idNumber: "S001" },
		{ studentId: 2, idNumber: "S002" },
		{ studentId: 3, idNumber: "S003" }
	];

	console.log("ONE-TO-ONE Relationship:\n");
	console.log("Students:", students);
	console.log("Student IDs:", studentIDs);
	console.log("\n\tEach student has exactly one ID, and each ID belongs to exactly one student");
	sep();

	// ONE-TO-MANY: Each teacher can teach many students
	const teachers = [
		{ id: 1, name: "Ms. Smith" },
		{ id: 2, name: "Mr. Jones" }
	];

	const classes = [
		{ studentId: 1, teacherId: 1 }, // Alice is taught by Ms. Smith
		{ studentId: 2, teacherId: 1 }, // Bob is taught by Ms. Smith
		{ studentId: 3, teacherId: 2 }  // Charlie is taught by Mr. Jones
	];

	console.log("ONE-TO-MANY Relationship:\n");
	console.log("Teachers:", teachers);
	console.log("Classes:", classes);
	console.log("Ms. Smith teaches 2 students, Mr. Jones teaches 1 student");
	sep();

	// MANY-TO-MANY: Students can take many courses, courses can have many students
	const courses = [
		{ id: 1, name: "Math" },
		{ id: 2, name: "Science" },
		{ id: 3, name: "History" }
	];

	const enrollments = [
		{ studentId: 1, courseId: 1 }, // Alice takes Math
		{ studentId: 1, courseId: 2 }, // Alice takes Science
		{ studentId: 2, courseId: 1 }, // Bob takes Math
		{ studentId: 2, courseId: 3 }, // Bob takes History
		{ studentId: 3, courseId: 2 }  // Charlie takes Science
	];

	console.log("MANY-TO-MANY Relationship:\n");
	console.log("Courses:", courses);
	console.log("Enrollments:", enrollments);
	console.log("Students can take multiple courses, courses can have multiple students");
	// ^ think: why do we need a separate 'enrollments' table for many-to-many relationships?
	sep();

	// REFERENTIAL INTEGRITY: Making sure our references are valid
	console.log("REFERENTIAL INTEGRITY:");

	// Bad example - broken reference
	const brokenEnrollment = { studentId: 999, courseId: 1 }; // Student 999 doesn't exist!
	console.log("Broken reference:", brokenEnrollment);

	// Simple validation function
	function validateEnrollment(enrollment) {
		const studentExists = students.some(s => s.id === enrollment.studentId);
		const courseExists = courses.some(c => c.id === enrollment.courseId);
		return studentExists && courseExists;
	}

	console.log("Is broken enrollment valid?", validateEnrollment(brokenEnrollment));
	console.log("Is first enrollment valid?", validateEnrollment(enrollments[0]));
	// ^ think: where should data be validated?
	sep();

	// NORMALIZATION vs DENORMALIZATION
	console.log("NORMALIZATION vs DENORMALIZATION:");

	// Normalized (data split apart, no repetition)
	console.log("\nNormalized approach (what we've been doing):");
	console.log("- Students table:", students.slice(0, 2));
	console.log("- Courses table:", courses.slice(0, 2));
	console.log("- Enrollments table:", enrollments.slice(0, 2));

	// Denormalized (data combined for convenience)
	const denormalizedData = [
		{
			studentName: "Alice",
			courseName: "Math",
			teacherName: "Ms. Smith"
		},
		{
			studentName: "Alice",
			courseName: "Science",
			teacherName: "Ms. Smith"
		},
		{
			studentName: "Bob",
			courseName: "Math",
			teacherName: "Ms. Smith"
		}
	];

	console.log("\nDenormalized approach (everything together):");
	console.log(denormalizedData);
	console.log("Notice: 'Ms. Smith' appears 3 times! If she changes her name, we'd have to update it everywhere");
	// ^ think: when would you choose normalized vs denormalized? hint: read speed vs write complexity
	sep();

	// GRAPH STRUCTURES: Remember the friends from Module 2?
	console.log("GRAPH STRUCTURES - A Better Way to Model Networks:");

	// Instead of deeply nested objects, use nodes and edges
	const people = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "Diana" },
		{ id: 5, name: "Eve" }
	];

	const friendships = [
		{ from: 1, to: 2 }, // Alice -> Bob
		{ from: 1, to: 3 }, // Alice -> Charlie
		{ from: 2, to: 3 }, // Bob -> Charlie
		{ from: 3, to: 4 }, // Charlie -> Diana
		{ from: 4, to: 5 }  // Diana -> Eve
	];

	console.log("People (nodes):", people);
	console.log("Friendships (edges):", friendships);

	// Simple function to find friends
	function findFriends(personId) {
		return friendships
			.filter(f => f.from === personId)
			.map(f => people.find(p => p.id === f.to).name);
	}

	console.log("Alice's friends:", findFriends(1));
	console.log("Charlie's friends:", findFriends(3));
	sep();

	// PRACTICAL EXAMPLE: Product Catalog
	console.log("PRACTICAL EXAMPLE - E-commerce Product Catalog:");

	const products = [
		{ id: 1, name: "Laptop", categoryId: 1 },
		{ id: 2, name: "Mouse", categoryId: 1 },
		{ id: 3, name: "T-Shirt", categoryId: 2 }
	];

	const categories = [
		{ id: 1, name: "Electronics" },
		{ id: 2, name: "Clothing" }
	];

	const inventory = [
		{ productId: 1, warehouseId: 1, quantity: 50 },
		{ productId: 1, warehouseId: 2, quantity: 30 },
		{ productId: 2, warehouseId: 1, quantity: 200 }
	];

	const warehouses = [
		{ id: 1, location: "New York" },
		{ id: 2, location: "Los Angeles" }
	];

	console.log(`DATA MODELING EXAMPLE:\n`,
		"\nProducts:", products, '\n',
		"\nCategories:", categories, '\n',
		"\nInventory:", inventory, '\n',
		"\nWarehouses:", warehouses, '\n'
	);
	console.log("This models:");
	console.log("- Products belong to categories (many-to-one)");
	console.log("- Products are stored in multiple warehouses (many-to-many)");
	console.log("- Each warehouse has different quantities of each product");

	// TODO: WISDOM: Real-world data is all about relationships! Choose your structure based on:
	// - How often data changes (normalization helps with updates)
	// - How fast you need to read it (denormalization helps with queries)
	// - How complex the relationships are (graphs handle networks well)
	sep();
})();


// MODULE 4: DATA OPERATIONS AND TRANSFORMATIONS
(function data_operations_and_transformations() {
	bigSep();
	console.log('LESSON 4: Data Operations and Transformations\n\tHow to manipulate and query structured data');
	sep();

	// Let's work with a simple dataset: a bookstore
	let books = [
		{ id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, genre: "Fiction", stock: 5 },
		{ id: 2, title: "1984", author: "George Orwell", price: 13.99, genre: "Fiction", stock: 3 },
		{ id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 29.99, genre: "Tech", stock: 10 },
		{ id: 4, title: "Clean Code", author: "Robert Martin", price: 34.99, genre: "Tech", stock: 7 },
		{ id: 5, title: "Sapiens", author: "Yuval Noah Harari", price: 18.99, genre: "History", stock: 0 }
	];

	console.log("Our bookstore inventory:", books);
	sep();

	// CRUD OPERATIONS
	console.log("CRUD OPERATIONS:");

	// CREATE - Adding a new book
	function addBook(title, author, price, genre, stock) {
		const newBook = {
			id: Math.max(...books.map(b => b.id)) + 1, // Simple ID generation
			title, author, price, genre, stock
		};
		books.push(newBook);
		return newBook;
	}

	const newBook = addBook("Dune", "Frank Herbert", 15.99, "Fiction", 8);
	console.log("Created:", newBook);

	// READ - Finding a book
	function findBook(id) {
		return books.find(book => book.id === id);
	}

	console.log("Read book with ID 3:", findBook(3));

	// UPDATE - Changing book details
	function updateBook(id, updates) {
		const bookIndex = books.findIndex(book => book.id === id);
		if (bookIndex !== -1) {
			books[bookIndex] = { ...books[bookIndex], ...updates };
			return books[bookIndex];
		}
		return null;
	}

	console.log("Updated price of book 1:", updateBook(1, { price: 14.99 }));

	// DELETE - Removing a book
	function deleteBook(id) {
		const bookIndex = books.findIndex(book => book.id === id);
		if (bookIndex !== -1) {
			return books.splice(bookIndex, 1)[0];
		}
		return null;
	}

	console.log("Deleted book 6:", deleteBook(6));
	console.log("Books after CRUD operations:", books.length, "books remaining");
	sep();

	// FILTERING AND SEARCHING
	console.log("FILTERING AND SEARCHING:");

	// Simple filters
	const fictionBooks = books.filter(book => book.genre === "Fiction");
	console.log("Fiction books:", fictionBooks.map(b => b.title));

	const expensiveBooks = books.filter(book => book.price > 20);
	console.log("Books over $20:", expensiveBooks.map(b => `${b.title} ($${b.price})`));

	const inStock = books.filter(book => book.stock > 0);
	console.log("Books in stock:", inStock.length, "out of", books.length);

	// Complex search
	function searchBooks(query) {
		const lowerQuery = query.toLowerCase();
		return books.filter(book =>
			book.title.toLowerCase().includes(lowerQuery) ||
			book.author.toLowerCase().includes(lowerQuery)
		);
	}

	console.log("Search for 'the':", searchBooks("the").map(b => b.title));
	// ^ think: how could you make search more flexible? fuzzy matching? relevance scoring?
	sep();

	// AGGREGATION AND GROUPING
	console.log("AGGREGATION AND GROUPING:");

	// Basic aggregations
	const totalValue = books.reduce((sum, book) => sum + (book.price * book.stock), 0);
	console.log("Total inventory value: $" + totalValue.toFixed(2));

	const averagePrice = books.reduce((sum, book) => sum + book.price, 0) / books.length;
	console.log("Average book price: $" + averagePrice.toFixed(2));

	// Grouping by genre
	function groupBy(array, key) {
		return array.reduce((groups, item) => {
			const group = item[key];
			if (!groups[group]) groups[group] = [];
			groups[group].push(item);
			return groups;
		}, {});
	}

	const booksByGenre = groupBy(books, 'genre');
	console.log("\nBooks grouped by genre:");
	Object.entries(booksByGenre).forEach(([genre, books]) => {
		console.log(`  ${genre}: ${books.length} books, total value: $${books.reduce((sum, b) => sum + b.price * b.stock, 0).toFixed(2)
			}`);
	});
	// ^ think: all analytics queries are fundamentally "aggregation" operations
	sep();

	// JOINS AND MERGING
	console.log("JOINS AND MERGING:");

	// Let's add some sales data
	const sales = [
		{ bookId: 1, quantity: 2, date: "2024-01-15" },
		{ bookId: 3, quantity: 1, date: "2024-01-16" },
		{ bookId: 1, quantity: 1, date: "2024-01-17" },
		{ bookId: 2, quantity: 3, date: "2024-01-17" }
	];

	// Join sales with book info
	function joinSalesWithBooks(sales, books) {
		return sales.map(sale => {
			const book = books.find(b => b.id === sale.bookId);
			return {
				...sale,
				title: book?.title,
				revenue: book ? book.price * sale.quantity : 0
			};
		});
	}

	const salesReport = joinSalesWithBooks(sales, books);
	console.log("Sales Report:", salesReport);

	// Calculate total revenue by book
	const revenueByBook = salesReport.reduce((acc, sale) => {
		if (!acc[sale.title]) acc[sale.title] = 0;
		acc[sale.title] += sale.revenue;
		return acc;
	}, {});
	console.log("Revenue by book:", revenueByBook);
	sep();

	// DATA VALIDATION
	console.log("DATA VALIDATION:");

	function validateBook(book) {
		const errors = [];

		if (!book.title || book.title.trim() === "") {
			errors.push("Title is required");
		}
		if (!book.author || book.author.trim() === "") {
			errors.push("Author is required");
		}
		if (typeof book.price !== 'number' || book.price < 0) {
			errors.push("Price must be a positive number");
		}
		if (typeof book.stock !== 'number' || book.stock < 0 || !Number.isInteger(book.stock)) {
			errors.push("Stock must be a non-negative integer");
		}

		return {
			isValid: errors.length === 0,
			errors
		};
	}

	const invalidBook = { title: "", price: -5, stock: 3.5 };
	const validBook = { title: "Valid Book", author: "Valid Author", price: 19.99, genre: "Fiction", stock: 5 };

	console.log("Validating invalid book:", validateBook(invalidBook));
	console.log("Validating valid book:", validateBook(validBook));
	// ^ think: what other validation rules might be important? ISBN format? genre from allowed list?
	sep();

	// PERFORMANCE CONSIDERATIONS
	console.log("PERFORMANCE CONSIDERATIONS:");

	// Creating an index for faster lookups
	const bookIndex = books.reduce((index, book) => {
		index[book.id] = book;
		return index;
	}, {});

	console.log("Without index - searching through array:");
	console.time("arraySearch");
	for (let i = 0; i < 1000; i++) {
		books.find(b => b.id === 3);
	}
	console.timeEnd("arraySearch");

	console.log("With index - direct lookup:");
	console.time("indexLookup");
	for (let i = 0; i < 1000; i++) {
		bookIndex[3];
	}
	console.timeEnd("indexLookup");

	console.log("Index lookups are much faster for finding by ID!");

	// TODO: WISDOM: Different operations have different costs:
	// - Array.find() looks at each item until found (O(n))
	// - Object property access is nearly instant (O(1))
	// - Sorting is expensive (O(n log n))
	// - Choose your data structure based on what operations you do most!
	sep();
})();


// MODULE 5: DATA STORAGE AND PERSISTENCE
(function data_storage_and_persistence() {
	bigSep();
	console.log('LESSON 5: Data Storage and Persistence\n\tHow data lives beyond memory - databases, files, and APIs');
	sep();

	// Let's use a simple user profile as our example data
	const userProfile = {
		id: 123,
		username: "alice_wonder",
		email: "alice@example.com",
		preferences: {
			theme: "dark",
			notifications: true,
			language: "en"
		},
		posts: [
			{ id: 1, content: "Hello world!", likes: 5, created: "2024-01-15" },
			{ id: 2, content: "Learning about data!", likes: 12, created: "2024-01-16" }
		]
	};

	console.log("Our example data:", userProfile);
	sep();

	// DATABASE TYPES: SQL vs NoSQL
	console.log("DATABASE TYPES - SQL vs NoSQL:");

	// SQL representation (relational)
	console.log("\nSQL / Relational approach - data split into tables:");

	const sqlUsers = `
	users table:
	| id  | username      | email             |
	| 123 | alice_wonder  | alice@example.com |`;

	const sqlPreferences = `
	preferences table:
	| user_id | theme | notifications | language |
	| 123     | dark  | true          | en       |`;

	const sqlPosts = `
	posts table:
	| id | user_id | content              | likes | created    |
	| 1  | 123     | Hello world!         | 5     | 2024-01-15 |
	| 2  | 123     | Learning about data! | 12    | 2024-01-16 |`;

	console.log(sqlUsers);
	console.log(sqlPreferences);
	console.log(sqlPosts);
	console.log("\nTo get all data, you'd JOIN these tables together");

	// NoSQL representation (document)
	console.log("\nNoSQL / Document approach - everything together:");
	console.log(JSON.stringify(userProfile, null, 2));
	console.log("The entire user is stored as one document");
	// ^ think: when would you want your data split up vs all together?
	sep();

	// FILE STORAGE
	console.log("FILE STORAGE:");

	// Simulating file operations (in real life, these would write to disk)
	function saveToJSON(data, filename) {
		const jsonString = JSON.stringify(data, null, 2);
		console.log(`Saving to ${filename}:`);
		console.log(jsonString.substring(0, 100) + "...");
		return jsonString;
	}

	function saveToCSV(users) {
		const headers = "id,username,email,theme,notifications";
		const rows = users.map(u =>
			`${u.id},${u.username},${u.email},${u.preferences.theme},${u.preferences.notifications}`
		);
		const csv = [headers, ...rows].join("\n");
		console.log("Saving to users.csv:");
		console.log(csv);
		return csv;
	}

	saveToJSON(userProfile, "profile.json");
	console.log();
	saveToCSV([userProfile]); // CSV works better for multiple records
	sep();

	// DATA SERIALIZATION
	console.log("DATA SERIALIZATION - Converting between formats:");

	// JavaScript object to JSON string
	const serialized = JSON.stringify(userProfile);
	console.log("Serialized (can be stored):", serialized.substring(0, 60) + "...");

	// JSON string back to JavaScript object
	const deserialized = JSON.parse(serialized);
	console.log("Deserialized (can be used):", deserialized.username);

	// Handling special types
	const complexData = {
		date: new Date(),
		undefinedValue: undefined,
		functionValue: function () { return "hello"; },
		regexValue: /[a-z]+/
	};

	console.log("\nOriginal complex data:", complexData);
	console.log("After JSON serialization:", JSON.parse(JSON.stringify(complexData)));
	console.log("Notice: functions, undefined, and regex are lost!");
	// ^ think: what data types can't be serialized to JSON? how would you handle them?
	sep();

	// API DESIGN
	console.log("API DESIGN - How data structures map to endpoints:");

	const apiEndpoints = {
		"GET /users/123": {
			description: "Get user by ID",
			returns: { id: 123, username: "alice_wonder", email: "alice@example.com" }
		},
		"GET /users/123/posts": {
			description: "Get user's posts",
			returns: userProfile.posts
		},
		"POST /users/123/posts": {
			description: "Create new post",
			accepts: { content: "New post!", likes: 0 },
			returns: { id: 3, content: "New post!", likes: 0, created: "2024-01-17" }
		},
		"PUT /users/123/preferences": {
			description: "Update preferences",
			accepts: { theme: "light" },
			returns: { theme: "light", notifications: true, language: "en" }
		}
	};

	console.log("RESTful API endpoints:");
	Object.entries(apiEndpoints).forEach(([endpoint, details]) => {
		console.log(`\n${endpoint} - ${details.description}`);
		if (details.accepts) console.log("  Accepts:", details.accepts);
		console.log("  Returns:", details.returns);
	});
	sep();

	// CACHING STRATEGIES
	console.log("CACHING STRATEGIES:");

	// Simple in-memory cache
	const cache = {};

	function getCachedUser(userId) {
		const cacheKey = `user_${userId}`;

		// Check if in cache and not expired
		if (cache[cacheKey] && cache[cacheKey].expires > Date.now()) {
			console.log("Cache HIT! Returning cached data");
			return cache[cacheKey].data;
		}

		// Simulate database fetch
		console.log("Cache MISS! Fetching from database...");
		const userData = { id: userId, username: "alice_wonder", fetchedAt: new Date() };

		// Store in cache with expiration
		cache[cacheKey] = {
			data: userData,
			expires: Date.now() + 60000 // Expires in 1 minute
		};

		return userData;
	}

	console.log("First call:", getCachedUser(123));
	console.log("Second call:", getCachedUser(123));
	// ^ think: when should you cache? what are the tradeoffs?
	sep();

	// DATA MIGRATION
	console.log("DATA MIGRATION - Evolving data structures:");

	// Version 1 of our data
	const dataV1 = {
		id: 123,
		name: "Alice Wonder", // Single name field
		email: "alice@example.com"
	};

	// Migration function to version 2
	function migrateV1toV2(oldData) {
		const names = oldData.name.split(' ');
		return {
			id: oldData.id,
			firstName: names[0] || '',
			lastName: names.slice(1).join(' ') || '',
			email: oldData.email,
			version: 2
		};
	}

	console.log("Original V1 data:", dataV1);
	console.log("Migrated V2 data:", migrateV1toV2(dataV1));

	// Version checking
	function loadUserData(rawData) {
		const version = rawData.version || 1;

		switch (version) {
			case 1:
				return migrateV1toV2(rawData);
			case 2:
				return rawData; // Already current
			default:
				throw new Error(`Unknown data version: ${version}`);
		}
	}

	console.log("\nLoading old data:", loadUserData(dataV1));
	console.log("Loading new data:", loadUserData({ ...migrateV1toV2(dataV1), version: 2 }));

	// TODO: WISDOM: Data persistence is about tradeoffs:
	// - SQL: Great for complex queries and relationships, but rigid structure
	// - NoSQL: Flexible and fast for simple queries, but can lead to data duplication
	// - Files: Simple and portable, but slow for large datasets
	// - APIs: Enable sharing and real-time updates, but require network
	// - Caching: Fast but can show stale data
	// - Always plan for data migration - your structure WILL change!
	sep();
})();


// BONUS MODULE: BLOCKCHAIN DATA STRUCTURES
(function blockchain_and_hashing() {
	bigSep();
	console.log('BONUS LESSON: Blockchain Data Structures\n\tHow hashing creates tamper-proof linked data');
	sep();
	
	// First, let's understand HASHING
	console.log("WHAT IS HASHING?");
	console.log("A hash is like a fingerprint for data - unique and always the same for the same input");
	
	// Simple hash function (not cryptographically secure, but good for learning!)
	function simpleHash(data) {
		let hash = 0;
		const str = JSON.stringify(data);
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32-bit integer
		}
		// Convert to positive hex string
		return Math.abs(hash).toString(16).padStart(8, '0');
	}
	
	// Demonstrate hashing
	console.log("\nHash examples:");
	console.log("Hash of 'Hello':", simpleHash("Hello"));
	console.log("Hash of 'Hello!':", simpleHash("Hello!"));
	console.log("Hash of 'hello':", simpleHash("hello"));
	console.log("Notice: Tiny changes create completely different hashes!");
	
	const data1 = { name: "Alice", grade: 95 };
	const data2 = { name: "Alice", grade: 96 };
	console.log("\nHash of", data1, ":", simpleHash(data1));
	console.log("Hash of", data2, ":", simpleHash(data2));
	console.log("Even changing grade by 1 point creates a different hash!");
	// ^ think: why is it important that small changes create completely different hashes?
	sep();
	
	// Now let's build a BLOCKCHAIN
	console.log("BUILDING A BLOCKCHAIN:");
	console.log("A blockchain is a chain of blocks where each block contains:");
	console.log("1. Some data");
	console.log("2. A timestamp");
	console.log("3. The hash of the PREVIOUS block");
	console.log("4. Its own hash (based on all the above)");
	sep();
	
	// Block class
	class Block {
		constructor(data, previousHash = '00000000') {
			this.timestamp = new Date().toISOString();
			this.data = data;
			this.previousHash = previousHash;
			this.hash = this.calculateHash();
		}
		
		calculateHash() {
			return simpleHash({
				timestamp: this.timestamp,
				data: this.data,
				previousHash: this.previousHash
			});
		}
	}
	
	// Create a blockchain for a tamper-proof gradebook
	console.log("Let's create a tamper-proof gradebook using blockchain!");
	
	// Genesis block (first block)
	const genesisBlock = new Block({ 
		message: "Grade Ledger Started",
		teacher: "Ms. Smith",
		class: "Tech 201"
	});
	
	console.log("Genesis Block:", {
		data: genesisBlock.data,
		hash: genesisBlock.hash,
		previousHash: genesisBlock.previousHash
	});
	sep();
	
	// Create a simple blockchain
	class Blockchain {
		constructor() {
			this.chain = [genesisBlock];
		}
		
		getLatestBlock() {
			return this.chain[this.chain.length - 1];
		}
		
		addBlock(data) {
			const newBlock = new Block(data, this.getLatestBlock().hash);
			this.chain.push(newBlock);
			return newBlock;
		}
		
		// Check if the chain is valid
		isValid() {
			for (let i = 1; i < this.chain.length; i++) {
				const currentBlock = this.chain[i];
				const previousBlock = this.chain[i - 1];
				
				// Check if the block's hash is correct
				if (currentBlock.hash !== currentBlock.calculateHash()) {
					return { valid: false, reason: `Block ${i} has been tampered with!` };
				}
				
				// Check if it properly links to the previous block
				if (currentBlock.previousHash !== previousBlock.hash) {
					return { valid: false, reason: `Block ${i} has broken chain link!` };
				}
			}
			return { valid: true, reason: "Chain is valid!" };
		}
		
		// Pretty print the chain
		display() {
			console.log("\nBLOCKCHAIN STATE:");
			this.chain.forEach((block, index) => {
				console.log(`\nBlock ${index}:`);
				console.log(`  Data: ${JSON.stringify(block.data)}`);
				console.log(`  Hash: ${block.hash}`);
				console.log(`  Previous: ${block.previousHash}`);
				console.log(`  Time: ${block.timestamp}`);
			});
		}
	}
	
	// Use the blockchain
	const gradeLedger = new Blockchain();
	
	// Add some grades
	console.log("Adding grades to the ledger...");
	
	gradeLedger.addBlock({
		student: "Alice",
		assignment: "Homework 1",
		grade: 95,
		grader: "Ms. Smith"
	});
	
	gradeLedger.addBlock({
		student: "Bob",
		assignment: "Homework 1", 
		grade: 87,
		grader: "Ms. Smith"
	});
	
	gradeLedger.addBlock({
		student: "Charlie",
		assignment: "Homework 1",
		grade: 92,
		grader: "Ms. Smith"
	});
	
	gradeLedger.display();
	console.log("\nValidation:", gradeLedger.isValid());
	sep();
	
	// DEMONSTRATE TAMPER DETECTION
	console.log("TAMPER DETECTION:");
	console.log("What happens if someone tries to change a grade?");
	
	// Save the original state
	const block1 = gradeLedger.chain[1];
	const originalGrade = block1.data.grade;
	const originalHash = block1.hash;
	
	console.log("\n📊 BEFORE TAMPERING:");
	console.log("  Alice's grade:", originalGrade);
	console.log("  Block hash:", originalHash);
	console.log("  Next block expects:", gradeLedger.chain[2].previousHash);
	console.log("  ✅ Hashes match!");
	
	// Someone tries to tamper with Alice's grade
	console.log("\n🔨 TAMPERING: Changing Alice's grade to 100...");
	block1.data.grade = 100;
	
	console.log("\n📊 AFTER TAMPERING (without recalculating hash):");
	console.log("  Alice's grade:", block1.data.grade, "⚠️ CHANGED!");
	console.log("  Block hash:", block1.hash, "(same as before)");
	console.log("  Expected hash:", block1.calculateHash(), "⚠️ DIFFERENT!");
	console.log("  Validation:", gradeLedger.isValid());
	
	// What if they try to recalculate the hash?
	console.log("\n🔧 TRYING TO FIX: Recalculating hash after tampering...");
	const oldHash = block1.hash;
	block1.hash = block1.calculateHash();
	
	console.log("\n📊 AFTER RECALCULATING HASH:");
	console.log("  Block 1 hash changed:");
	console.log("    Was:", oldHash);
	console.log("    Now:", block1.hash);
	console.log("  But Block 2 still expects:", gradeLedger.chain[2].previousHash);
	console.log("  ❌ Chain is broken between Block 1 and Block 2!");
	console.log("  Validation:", gradeLedger.isValid());
	
	console.log("\n💡 To fix Block 2, you'd need to:");
	console.log("  1. Update Block 2's previousHash");
	console.log("  2. Recalculate Block 2's hash");
	console.log("  3. Update Block 3's previousHash");
	console.log("  4. And so on... for the ENTIRE chain!");
	// ^ think: why does changing one block affect all subsequent blocks?
	
	// Restore the original
	console.log("\n🔄 Restoring original data...");
	block1.data.grade = originalGrade;
	block1.hash = originalHash;
	sep();
	
	// REAL-WORLD CHARACTERISTICS
	console.log("BLOCKCHAIN CHARACTERISTICS:");
	
	// 1. Immutability
	console.log("\n1. IMMUTABILITY:");
	console.log("   Once data is in a block, it cannot be changed without detection");
	console.log("   Each block's hash depends on its content AND the previous block");
	
	// 2. Transparency
	console.log("\n2. TRANSPARENCY:");
	console.log("   Everyone can see all transactions in the chain");
	gradeLedger.chain.forEach((block, i) => {
		if (block.data.student) {
			console.log(`   - ${block.data.student}: ${block.data.grade} on ${block.data.assignment}`);
		}
	});
	
	// 3. Distributed Trust
	console.log("\n3. DISTRIBUTED TRUST:");
	console.log("   In real blockchains, multiple copies exist");
	console.log("   Everyone can verify the chain independently");
	console.log("   No single authority can change history");
	sep();
	
	// FUN EXAMPLE: Classroom Achievement Chain
	console.log("FUN EXAMPLE - Classroom Achievement Chain:");
	
	const achievementChain = new Blockchain();
	
	// Add some achievements
	achievementChain.addBlock({
		type: "achievement",
		student: "Gio",
		badge: "🌟 Perfect Attendance",
		month: "January"
	});
	
	achievementChain.addBlock({
		type: "achievement", 
		student: "Max",
		badge: "🚀 Code Master",
		reason: "Helped 5 classmates debug their code"
	});
	
	achievementChain.addBlock({
		type: "milestone",
		class: "Tech 201",
		event: "Everyone passed Module 3!",
		celebration: "🎉"
	});
	
	console.log("\nAchievement Chain:");
	achievementChain.chain.slice(1).forEach((block, i) => {
		const d = block.data;
		if (d.type === "achievement") {
			console.log(`${d.student} earned ${d.badge}!`);
		} else if (d.type === "milestone") {
			console.log(`${d.celebration} ${d.event}`);
		}
	});
	
	console.log("\nThis chain is tamper-proof - achievements are permanent!");
	console.log("Validation:", achievementChain.isValid());
	
	// TODO: WISDOM: Blockchain creates trust through transparency and immutability:
	// - Hashing creates a unique fingerprint for any data
	// - Chaining hashes makes the past unchangeable 
	// - Anyone can verify the integrity of the entire history
	// - Perfect for: audit logs, certificates, voting, supply chains
	// - Not great for: data that needs editing, private information
	// - Remember: blockchain is a data structure, not magic!
	sep();
})();


// BONUS MODULE: TREE STRUCTURES AND HIERARCHIES
(function tree_structures_and_hierarchies() {
	bigSep();
	console.log('BONUS LESSON: Tree Structures and Hierarchies\n\tData with branches - modeling hierarchical relationships');
	sep();
	
	// What makes a tree different from other structures?
	console.log("WHAT IS A TREE?");
	console.log("A tree is like a family tree or organization chart:");
	console.log("- One root (top/beginning)");
	console.log("- Each node has ONE parent (except the root)");
	console.log("- Nodes can have multiple children");
	console.log("- No cycles (you can't be your own grandparent!)");
	sep();
	
	// Let's start with a simple organization chart
	console.log("EXAMPLE 1: Company Organization Chart");
	
	class TreeNode {
		constructor(data) {
			this.data = data;
			this.children = [];
			this.parent = null;
		}
		
		addChild(childNode) {
			childNode.parent = this;
			this.children.push(childNode);
			return childNode;
		}
		
		// Find the level (depth) of this node
		getLevel() {
			let level = 0;
			let current = this;
			while (current.parent) {
				level++;
				current = current.parent;
			}
			return level;
		}
	}
	
	// Build a company hierarchy
	const ceo = new TreeNode({ name: "Alice", title: "CEO" });
	const cto = new TreeNode({ name: "Bob", title: "CTO" });
	const cfo = new TreeNode({ name: "Charlie", title: "CFO" });
	
	ceo.addChild(cto);
	ceo.addChild(cfo);
	
	const eng1 = new TreeNode({ name: "Diana", title: "Senior Engineer" });
	const eng2 = new TreeNode({ name: "Eve", title: "Engineer" });
	const accountant = new TreeNode({ name: "Frank", title: "Accountant" });
	
	cto.addChild(eng1);
	cto.addChild(eng2);
	cfo.addChild(accountant);
	
	// Display the tree
	function displayTree(node, prefix = "") {
		console.log(prefix + node.data.name + " (" + node.data.title + ")");
		node.children.forEach((child, index) => {
			const isLast = index === node.children.length - 1;
			displayTree(child, prefix + (isLast ? "  └─ " : "  ├─ "));
		});
	}
	
	console.log("\nCompany Structure:");
	displayTree(ceo);
	
	console.log("\nEach person's level in the company:");
	console.log("Diana is at level:", eng1.getLevel()); // 2 levels down from CEO
	console.log("Charlie is at level:", cfo.getLevel()); // 1 level down from CEO
	// ^ think: how is this different from the graph structure we learned earlier?
	sep();
	
	// EXAMPLE 2: File System
	console.log("EXAMPLE 2: File System Structure");
	
	class FileSystemNode extends TreeNode {
		constructor(name, type = 'folder') {
			super({ name, type });
			this.data.size = type === 'file' ? Math.floor(Math.random() * 1000) : 0;
		}
		
		getSize() {
			if (this.data.type === 'file') {
				return this.data.size;
			}
			// For folders, sum up all children
			return this.children.reduce((total, child) => total + child.getSize(), 0);
		}
		
		find(name) {
			if (this.data.name === name) return this;
			
			for (let child of this.children) {
				const found = child.find(name);
				if (found) return found;
			}
			return null;
		}
	}
	
	// Create a file system
	const root = new FileSystemNode('/', 'folder');
	const home = new FileSystemNode('home', 'folder');
	const documents = new FileSystemNode('documents', 'folder');
	const photos = new FileSystemNode('photos', 'folder');
	
	root.addChild(home);
	home.addChild(documents);
	home.addChild(photos);
	
	// Add some files
	documents.addChild(new FileSystemNode('essay.txt', 'file'));
	documents.addChild(new FileSystemNode('notes.txt', 'file'));
	photos.addChild(new FileSystemNode('vacation.jpg', 'file'));
	photos.addChild(new FileSystemNode('family.jpg', 'file'));
	
	console.log("\nFile System:");
	function displayFileSystem(node, prefix = "") {
		const icon = node.data.type === 'folder' ? '📁' : '📄';
		const size = node.data.type === 'file' ? ` (${node.data.size}kb)` : '';
		console.log(prefix + icon + ' ' + node.data.name + size);
		node.children.forEach((child, index) => {
			displayFileSystem(child, prefix + "  ");
		});
	}
	
	displayFileSystem(root);
	console.log("\nFolder sizes (includes all contents):");
	console.log("documents folder:", documents.getSize() + "kb");
	console.log("photos folder:", photos.getSize() + "kb");
	console.log("home folder:", home.getSize() + "kb");
	sep();
	
	// TREE TRAVERSAL
	console.log("TREE TRAVERSAL - Visiting Every Node:");
	
	// Depth-First Search (DFS) - go deep before going wide
	function traverseDepthFirst(node, callback) {
		callback(node);
		node.children.forEach(child => traverseDepthFirst(child, callback));
	}
	
	// Breadth-First Search (BFS) - visit all at same level before going deeper
	function traverseBreadthFirst(root, callback) {
		const queue = [root];
		while (queue.length > 0) {
			const node = queue.shift();
			callback(node);
			queue.push(...node.children);
		}
	}
	
	console.log("\nDepth-First Traversal (explore each branch fully):");
	const dfsOrder = [];
	traverseDepthFirst(root, node => dfsOrder.push(node.data.name));
	console.log(dfsOrder.join(" → "));
	
	console.log("\nBreadth-First Traversal (level by level):");
	const bfsOrder = [];
	traverseBreadthFirst(root, node => bfsOrder.push(node.data.name));
	console.log(bfsOrder.join(" → "));
	// ^ think: when would you use depth-first vs breadth-first? copying files vs displaying a tree!
	sep();
	
	// BINARY TREES - Special case with at most 2 children
	console.log("BINARY TREES - Each Node Has At Most 2 Children:");
	console.log("But why are BINARY SEARCH TREES special for finding values?");
	
	class BinaryNode {
		constructor(value) {
			this.value = value;
			this.left = null;
			this.right = null;
		}
		
		// Insert values to maintain sorted order
		insert(value) {
			if (value < this.value) {
				if (this.left === null) {
					this.left = new BinaryNode(value);
				} else {
					this.left.insert(value);
				}
			} else {
				if (this.right === null) {
					this.right = new BinaryNode(value);
				} else {
					this.right.insert(value);
				}
			}
		}
		
		// Search for a value (counting steps!)
		search(value, steps = 0) {
			steps++;
			console.log(`  Step ${steps}: Checking ${this.value}...`);
			
			if (value === this.value) {
				console.log(`  ✅ Found ${value} in ${steps} steps!`);
				return { found: true, steps };
			}
			
			if (value < this.value) {
				console.log(`    ${value} < ${this.value}, going LEFT`);
				if (this.left) return this.left.search(value, steps);
			} else {
				console.log(`    ${value} > ${this.value}, going RIGHT`);
				if (this.right) return this.right.search(value, steps);
			}
			
			console.log(`  ❌ ${value} not found after ${steps} steps`);
			return { found: false, steps };
		}
	}
	
	// First, let's see a regular (unordered) tree
	console.log("\n🌳 REGULAR TREE (not sorted):");
	const regularTree = {
		value: 10,
		children: [
			{ value: 5, children: [
				{ value: 15, children: [] },
				{ value: 3, children: [] }
			]},
			{ value: 7, children: [
				{ value: 12, children: [] },
				{ value: 1, children: [] },
				{ value: 17, children: [] }
			]}
		]
	};
	
	console.log("Structure: 10 has children [5, 7]");
	console.log("           5 has children [15, 3]");
	console.log("           7 has children [12, 1, 17]");
	
	// Search in regular tree (have to check EVERY node potentially)
	function searchRegularTree(node, target, steps = 0) {
		steps++;
		console.log(`  Step ${steps}: Checking ${node.value}...`);
		
		if (node.value === target) {
			console.log(`  ✅ Found ${target} in ${steps} steps!`);
			return { found: true, steps };
		}
		
		// Have to check ALL children
		for (let child of node.children) {
			const result = searchRegularTree(child, target, steps);
			if (result.found) return result;
			steps = result.steps;
		}
		
		return { found: false, steps };
	}
	
	console.log("\nSearching for 17 in regular tree:");
	searchRegularTree(regularTree, 17);
	console.log("Had to check many nodes because there's no order!");
	
	sep();
	
	// Now let's see a BINARY SEARCH tree
	console.log("🔍 BINARY SEARCH TREE (sorted):");
	const binaryRoot = new BinaryNode(10);
	[5, 15, 3, 7, 12, 17, 1].forEach(val => binaryRoot.insert(val));
	
	console.log("\nSame values, but organized by size:");
	console.log("         10");
	console.log("       /    \\");
	console.log("      5      15      (left < parent < right)");
	console.log("     / \\    /  \\");
	console.log("    3   7  12  17");
	console.log("   /");
	console.log("  1");
	
	console.log("\nSearching for 17 in binary search tree:");
	binaryRoot.search(17);
	
	console.log("\nSearching for 7:");
	binaryRoot.search(7);
	
	console.log("\nSearching for 9 (doesn't exist):");
	binaryRoot.search(9);
	
	sep();
	
	// Let's compare with a simple sorted array
	console.log("COMPARISON: Why not just use a sorted array?");
	
	const sortedArray = [1, 3, 5, 7, 10, 12, 15, 17];
	console.log("\nSorted array:", sortedArray);
	
	// Binary search in array
	function binarySearchArray(arr, target) {
		let steps = 0;
		let left = 0;
		let right = arr.length - 1;
		
		while (left <= right) {
			steps++;
			const mid = Math.floor((left + right) / 2);
			console.log(`  Step ${steps}: Checking index ${mid} (value: ${arr[mid]})`);
			
			if (arr[mid] === target) {
				console.log(`  ✅ Found ${target} in ${steps} steps!`);
				return { found: true, steps };
			}
			
			if (target < arr[mid]) {
				console.log(`    ${target} < ${arr[mid]}, searching left half`);
				right = mid - 1;
			} else {
				console.log(`    ${target} > ${arr[mid]}, searching right half`);
				left = mid + 1;
			}
		}
		
		console.log(`  ❌ ${target} not found after ${steps} steps`);
		return { found: false, steps };
	}
	
	console.log("\nSearching array for 17:");
	binarySearchArray(sortedArray, 17);
	
	console.log("\n📊 PERFORMANCE COMPARISON:");
	console.log("With 8 values:");
	console.log("- Regular tree: might check up to 8 nodes (all of them!)");
	console.log("- Binary search tree: checks at most 4 nodes");
	console.log("- Sorted array: checks at most 3 positions");
	console.log("\nWith 1000 values:");
	console.log("- Regular tree: might check up to 1000 nodes 😱");
	console.log("- Binary search tree: checks at most 10 nodes 🚀");
	console.log("- Sorted array: checks at most 10 positions 🚀");
	
	console.log("\n⚡ The magic: Each comparison eliminates HALF the remaining values!");
	// ^ think: binary search trees are fast for FINDING, but what about INSERTING new values?
	sep();
	
	// FUN EXAMPLE: Decision Tree (20 Questions)
	console.log("FUN EXAMPLE: Decision Tree - Animal Guessing Game!");
	
	class DecisionNode {
		constructor(question, yesAnswer = null, noAnswer = null) {
			this.question = question;
			this.yes = yesAnswer;
			this.no = noAnswer;
		}
		
		isLeaf() {
			return this.yes === null && this.no === null;
		}
		
		play() {
			if (this.isLeaf()) {
				console.log(`I guess: ${this.question}!`);
				return;
			}
			
			// For demo, let's simulate some answers
			console.log(`Question: ${this.question}`);
			const answer = this.question.includes("fly") ? "no" : 
			               this.question.includes("bark") ? "yes" : "no";
			console.log(`Answer: ${answer}`);
			
			if (answer === "yes" && this.yes) {
				this.yes.play();
			} else if (this.no) {
				this.no.play();
			}
		}
	}
	
	// Build a simple animal guessing tree
	const animalTree = new DecisionNode(
		"Does it have fur?",
		new DecisionNode(
			"Does it bark?",
			new DecisionNode("Dog"),
			new DecisionNode("Cat")
		),
		new DecisionNode(
			"Can it fly?",
			new DecisionNode("Bird"),
			new DecisionNode("Fish")
		)
	);
	
	console.log("\nLet's play! Think of an animal...");
	animalTree.play();
	
	console.log("\nThe decision tree structure:");
	console.log("                Does it have fur?");
	console.log("                /              \\");
	console.log("             Yes                No");
	console.log("              |                 |");
	console.log("        Does it bark?      Can it fly?");
	console.log("         /       \\          /       \\");
	console.log("       Yes       No       Yes       No");
	console.log("        |         |        |         |");
	console.log("       Dog       Cat      Bird      Fish");
	
	// TODO: WISDOM: Trees are everywhere in computing!
	// - File systems use trees to organize files
	// - HTML/DOM is a tree structure
	// - Binary search trees enable fast searching (O(log n))
	// - Decision trees power machine learning and games
	// - Parse trees help computers understand code
	// - Remember: trees = hierarchy + no cycles + one parent per node!
	sep();
})();

// BONUS MODULE: STATE MACHINES AND EVENT-DRIVEN DATA
(function state_machines_and_event_driven_data() {
	bigSep();
	console.log('BONUS LESSON: State Machines and Event-Driven Data\n\tModeling systems that change - from vending machines to video games');
	sep();

	// What is state?
	console.log("WHAT IS STATE?");
	console.log("State = the current condition of a system");
	console.log("Examples:");
	console.log("- A door can be: OPEN or CLOSED");
	console.log("- A light can be: ON or OFF");
	console.log("- A game can be: MENU, PLAYING, PAUSED, or GAME_OVER");
	console.log("\nEvents cause transitions between states!");
	sep();

	// Simple state machine example
	console.log("SIMPLE EXAMPLE: Light Switch");

	class LightSwitch {
		constructor() {
			this.state = 'OFF';
			this.history = [{ state: 'OFF', time: new Date(), event: 'created' }];
		}

		flip() {
			const oldState = this.state;
			this.state = this.state === 'OFF' ? 'ON' : 'OFF';
			this.history.push({
				state: this.state,
				time: new Date(),
				event: 'flip',
				from: oldState
			});
			console.log(`Light: ${oldState} → ${this.state}`);
		}

		showHistory() {
			console.log("\nLight switch history:");
			this.history.forEach((entry, i) => {
				console.log(`${i}: ${entry.event} → ${entry.state}`);
			});
		}
	}

	const light = new LightSwitch();
	console.log("Initial state:", light.state);
	light.flip();
	light.flip();
	light.flip();
	light.showHistory();
	// ^ think: why might keeping history be useful? debugging! undo! analytics!
	sep();

	// More complex: Vending Machine
	console.log("VENDING MACHINE STATE MACHINE:");

	class VendingMachine {
		constructor() {
			this.state = 'WAITING';
			this.balance = 0;
			this.selection = null;
			this.inventory = {
				'A1': { name: 'Chips', price: 1.50, stock: 5 },
				'A2': { name: 'Candy', price: 1.00, stock: 3 },
				'B1': { name: 'Soda', price: 2.00, stock: 4 }
			};

			// Define valid transitions
			this.transitions = {
				'WAITING': {
					'INSERT_COIN': 'HAS_MONEY',
					'SELECT': 'WAITING' // Can't select without money
				},
				'HAS_MONEY': {
					'INSERT_COIN': 'HAS_MONEY', // Stay in same state
					'SELECT': this.checkSelection.bind(this),
					'RETURN_COINS': 'WAITING'
				},
				'DISPENSING': {
					'COMPLETE': 'WAITING'
				}
			};
		}

		// Dynamic transition based on conditions
		checkSelection(event) {
			const item = this.inventory[event.code];
			if (!item) return 'HAS_MONEY'; // Invalid selection
			if (item.stock === 0) return 'HAS_MONEY'; // Out of stock
			if (this.balance < item.price) return 'HAS_MONEY'; // Not enough money
			return 'DISPENSING';
		}

		// Process an event
		processEvent(eventType, data = {}) {
			const oldState = this.state;
			const transitions = this.transitions[this.state];

			if (!transitions || !transitions[eventType]) {
				console.log(`⚠️  Invalid event '${eventType}' in state '${this.state}'`);
				return;
			}

			// Get next state (might be a function)
			const nextState = typeof transitions[eventType] === 'function'
				? transitions[eventType](data)
				: transitions[eventType];

			// Execute side effects
			this.executeTransition(eventType, data);

			this.state = nextState;
			console.log(`🎰 ${oldState} → [${eventType}] → ${this.state}`);
		}

		executeTransition(event, data) {
			switch (event) {
				case 'INSERT_COIN':
					this.balance += data.amount;
					console.log(`   💰 Balance: ${this.balance.toFixed(2)}`);
					break;
				case 'SELECT':
					const item = this.inventory[data.code];
					if (item && this.balance >= item.price) {
						console.log(`   🍫 Dispensing ${item.name}`);
						this.balance -= item.price;
						item.stock--;
						this.selection = data.code;
					}
					break;
				case 'RETURN_COINS':
					console.log(`   💸 Returning ${this.balance.toFixed(2)}`);
					this.balance = 0;
					break;
				case 'COMPLETE':
					console.log(`   ✅ Transaction complete!`);
					if (this.balance > 0) {
						console.log(`   💸 Change: ${this.balance.toFixed(2)}`);
						this.balance = 0;
					}
					break;
			}
		}

		showState() {
			console.log(`\n📍 Current State: ${this.state}`);
			console.log(`💵 Balance: ${this.balance.toFixed(2)}`);
			console.log("📦 Inventory:");
			Object.entries(this.inventory).forEach(([code, item]) => {
				console.log(`   ${code}: ${item.name} - ${item.price} (${item.stock} left)`);
			});
		}
	}

	// Use the vending machine
	const machine = new VendingMachine();
	machine.showState();

	console.log("\n--- Customer interaction ---");
	machine.processEvent('SELECT', { code: 'A1' }); // Can't select without money
	machine.processEvent('INSERT_COIN', { amount: 1.00 });
	machine.processEvent('INSERT_COIN', { amount: 0.50 });
	machine.processEvent('SELECT', { code: 'A1' }); // Now we can buy chips!
	machine.processEvent('COMPLETE');
	machine.showState();
	sep();

	// TRAFFIC LIGHT SYSTEM
	console.log("TRAFFIC LIGHT WITH TIMERS:");

	class TrafficLight {
		constructor() {
			this.state = 'RED';
			this.timer = null;

			// State configuration with durations
			this.states = {
				'RED': { duration: 3000, next: 'GREEN', display: '🔴' },
				'YELLOW': { duration: 1000, next: 'RED', display: '🟡' },
				'GREEN': { duration: 3000, next: 'YELLOW', display: '🟢' }
			};
		}

		start() {
			console.log("Starting traffic light...");
			this.display();
			this.scheduleNext();
		}

		transition() {
			const currentConfig = this.states[this.state];
			this.state = currentConfig.next;
			this.display();
			this.scheduleNext();
		}

		scheduleNext() {
			const duration = this.states[this.state].duration;
			// In real life, this would use setTimeout
			console.log(`  (will change in ${duration / 1000} seconds)`);
		}

		display() {
			const icon = this.states[this.state].display;
			console.log(`Traffic Light: ${icon} ${this.state}`);
		}

		// Emergency override
		emergency() {
			console.log("🚨 EMERGENCY! Forcing red light!");
			this.state = 'RED';
			this.display();
		}
	}

	const trafficLight = new TrafficLight();
	trafficLight.start();

	// Simulate transitions
	console.log("\nSimulating light changes:");
	trafficLight.transition(); // RED → GREEN
	trafficLight.transition(); // GREEN → YELLOW
	trafficLight.transition(); // YELLOW → RED
	trafficLight.emergency();  // Force to RED
	sep();

	// GAME STATE MACHINE
	console.log("VIDEO GAME STATE MACHINE:");

	class Game {
		constructor() {
			this.state = 'MENU';
			this.score = 0;
			this.lives = 3;
			this.level = 1;

			// Game states and valid transitions
			this.gameStates = {
				'MENU': ['START_GAME', 'VIEW_SCORES', 'QUIT'],
				'PLAYING': ['PAUSE', 'LOSE_LIFE', 'COMPLETE_LEVEL', 'GAME_OVER'],
				'PAUSED': ['RESUME', 'QUIT_TO_MENU'],
				'LEVEL_COMPLETE': ['NEXT_LEVEL', 'QUIT_TO_MENU'],
				'GAME_OVER': ['RESTART', 'QUIT_TO_MENU']
			};
		}

		handleEvent(action) {
			console.log(`\n🎮 Action: ${action}`);

			// Check if action is valid for current state
			if (!this.gameStates[this.state].includes(action)) {
				console.log(`   ❌ Can't ${action} while ${this.state}`);
				return;
			}

			// Process the action
			switch (action) {
				case 'START_GAME':
					this.state = 'PLAYING';
					this.score = 0;
					this.lives = 3;
					this.level = 1;
					console.log("   🎯 Game started!");
					break;

				case 'PAUSE':
					this.state = 'PAUSED';
					console.log("   ⏸️  Game paused");
					break;

				case 'RESUME':
					this.state = 'PLAYING';
					console.log("   ▶️  Game resumed");
					break;

				case 'LOSE_LIFE':
					this.lives--;
					console.log(`   💔 Lost a life! ${this.lives} remaining`);
					if (this.lives === 0) {
						this.state = 'GAME_OVER';
						console.log("   ☠️  GAME OVER!");
					}
					break;

				case 'COMPLETE_LEVEL':
					this.score += 100 * this.level;
					this.state = 'LEVEL_COMPLETE';
					console.log(`   🎉 Level ${this.level} complete! Score: ${this.score}`);
					break;

				case 'NEXT_LEVEL':
					this.level++;
					this.state = 'PLAYING';
					console.log(`   📈 Starting level ${this.level}`);
					break;

				case 'QUIT_TO_MENU':
				case 'RESTART':
					this.state = 'MENU';
					console.log("   🏠 Returning to menu");
					break;
			}

			this.displayStatus();
		}

		displayStatus() {
			console.log(`   📊 State: ${this.state} | Score: ${this.score} | Lives: ${this.lives} | Level: ${this.level}`);
		}
	}

	// Play the game!
	const game = new Game();
	console.log("🎮 Welcome to State Machine Adventure!");
	game.displayStatus();

	// Simulate a game session
	game.handleEvent('START_GAME');
	game.handleEvent('PAUSE');         // Can pause while playing
	game.handleEvent('LOSE_LIFE');     // Can't lose life while paused!
	game.handleEvent('RESUME');
	game.handleEvent('LOSE_LIFE');     // Now we can lose a life
	game.handleEvent('COMPLETE_LEVEL');
	game.handleEvent('NEXT_LEVEL');
	game.handleEvent('LOSE_LIFE');
	game.handleEvent('LOSE_LIFE');     // Game over!
	game.handleEvent('RESTART');
	// ^ think: how do game states prevent bugs? can't pause when already paused!
	sep();

	// EVENT-DRIVEN ARCHITECTURE
	console.log("EVENT-DRIVEN SYSTEMS:");

	class OrderSystem {
		constructor() {
			this.orders = [];
			this.eventLog = [];
		}

		// Process events that change order state
		processOrderEvent(orderId, event) {
			let order = this.orders.find(o => o.id === orderId);

			if (!order && event.type === 'ORDER_CREATED') {
				order = {
					id: orderId,
					state: 'PENDING',
					items: event.items,
					total: event.total,
					history: []
				};
				this.orders.push(order);
			}

			if (!order) {
				console.log(`Order ${orderId} not found!`);
				return;
			}

			// Log the event
			const logEntry = {
				orderId,
				timestamp: new Date().toISOString(),
				event: event.type,
				previousState: order.state,
				data: event
			};

			// State transitions based on events
			switch (event.type) {
				case 'ORDER_CREATED':
					console.log(`📦 Order ${orderId} created`);
					break;

				case 'PAYMENT_RECEIVED':
					if (order.state === 'PENDING') {
						order.state = 'PAID';
						console.log(`💳 Payment received for order ${orderId}`);
					}
					break;

				case 'ORDER_SHIPPED':
					if (order.state === 'PAID') {
						order.state = 'SHIPPED';
						order.trackingNumber = event.trackingNumber;
						console.log(`🚚 Order ${orderId} shipped!`);
					}
					break;

				case 'ORDER_DELIVERED':
					if (order.state === 'SHIPPED') {
						order.state = 'DELIVERED';
						console.log(`✅ Order ${orderId} delivered!`);
					}
					break;

				case 'ORDER_CANCELLED':
					if (order.state === 'PENDING' || order.state === 'PAID') {
						order.state = 'CANCELLED';
						console.log(`❌ Order ${orderId} cancelled`);
					}
					break;
			}

			logEntry.newState = order.state;
			order.history.push(logEntry);
			this.eventLog.push(logEntry);
		}

		// Replay events to reconstruct state
		replayEvents() {
			console.log("\n🔄 Replaying events to reconstruct state:");
			this.orders = []; // Clear current state

			this.eventLog.forEach(log => {
				console.log(`  Replaying: ${log.event} for order ${log.orderId}`);
				// In real system, would replay the actual event
			});

			console.log("State reconstructed from event log!");
		}

		showOrder(orderId) {
			const order = this.orders.find(o => o.id === orderId);
			if (order) {
				console.log(`\nOrder ${orderId}:`);
				console.log(`  State: ${order.state}`);
				console.log(`  Items: ${order.items}`);
				console.log(`  Total: ${order.total}`);
				if (order.trackingNumber) {
					console.log(`  Tracking: ${order.trackingNumber}`);
				}
			}
		}
	}

	// Process some orders
	const orderSystem = new OrderSystem();

	console.log("\n--- Order Processing ---");
	orderSystem.processOrderEvent('ORD-001', {
		type: 'ORDER_CREATED',
		items: 'Book, Pen',
		total: 25.99
	});

	orderSystem.processOrderEvent('ORD-001', {
		type: 'PAYMENT_RECEIVED',
		amount: 25.99
	});

	orderSystem.processOrderEvent('ORD-001', {
		type: 'ORDER_SHIPPED',
		trackingNumber: 'TRACK-12345'
	});

	orderSystem.showOrder('ORD-001');

	// Event sourcing benefit: we can replay history!
	orderSystem.replayEvents();

	// TODO: WISDOM: State machines and events create robust systems:
	// - States define what's possible (can't ship before payment!)
	// - Events trigger transitions (payment → shipping)
	// - Invalid transitions are prevented (no bugs!)
	// - Event logs provide audit trails and debugging
	// - State machines are used in: games, workflows, protocols, UI components
	// - Event-driven systems scale well and maintain history
	// - Remember: State + Event = New State + Side Effects!
	sep();
})();


// BONUS MODULE: STREAMS AND REAL-TIME DATA
(function streams_and_realtime_data() {
	bigSep();
	console.log('BONUS LESSON: Streams and Real-Time Data\n\tHandling continuous flows - from chat messages to live dashboards');
	sep();

	// What are streams?
	console.log("WHAT ARE STREAMS?");
	console.log("Streams = continuous flow of data over time");
	console.log("Examples:");
	console.log("- Chat messages arriving one by one");
	console.log("- Stock prices updating every second");
	console.log("- Sensor readings from IoT devices");
	console.log("- Log entries from web servers");
	console.log("\nUnlike static data, streams are INFINITE and LIVE!");
	// ^ think: how is this different from processing a fixed array?
	sep();

	// QUEUES - First In, First Out (FIFO)
	console.log("QUEUES - First In, First Out (FIFO):");
	console.log("Like a line at the grocery store - first person in line gets served first");

	class Queue {
		constructor() {
			this.items = [];
			this.front = 0; // Points to next item to remove
		}

		// Add to back of queue
		enqueue(item) {
			this.items.push(item);
			console.log(`📥 Queued: ${item} (queue size: ${this.size()})`);
		}

		// Remove from front of queue
		dequeue() {
			if (this.isEmpty()) {
				console.log("📭 Queue is empty!");
				return null;
			}
			const item = this.items[this.front];
			this.front++;
			console.log(`📤 Dequeued: ${item} (queue size: ${this.size()})`);

			// Optimize: reset when queue gets empty
			if (this.front === this.items.length) {
				this.items = [];
				this.front = 0;
			}

			return item;
		}

		peek() {
			return this.isEmpty() ? null : this.items[this.front];
		}

		isEmpty() {
			return this.front >= this.items.length;
		}

		size() {
			return this.items.length - this.front;
		}
	}

	// Simulate a print queue
	console.log("\n🖨️ PRINT QUEUE SIMULATION:");
	const printQueue = new Queue();

	printQueue.enqueue("Resume.pdf");
	printQueue.enqueue("Recipe.docx");
	printQueue.enqueue("Invoice.xlsx");

	console.log("Next to print:", printQueue.peek());

	// Process the queue
	console.log("\nProcessing print jobs:");
	while (!printQueue.isEmpty()) {
		const job = printQueue.dequeue();
		console.log(`🖨️ Printing ${job}...`);
	}
	sep();

	// CIRCULAR BUFFER - Fixed-size queue that overwrites old data
	console.log("CIRCULAR BUFFER - Fixed Memory for Continuous Data:");

	class CircularBuffer {
		constructor(capacity) {
			this.buffer = new Array(capacity);
			this.capacity = capacity;
			this.head = 0; // Where to write next
			this.tail = 0; // Where to read next
			this.size = 0;
		}

		write(item) {
			const wasOverwritten = this.size === this.capacity;
			this.buffer[this.head] = item;
			this.head = (this.head + 1) % this.capacity;

			if (wasOverwritten) {
				this.tail = (this.tail + 1) % this.capacity;
				console.log(`🔄 Buffer full! Overwrote old data. Added: ${item}`);
			} else {
				this.size++;
				console.log(`📝 Added: ${item} (buffer: ${this.size}/${this.capacity})`);
			}
		}

		read() {
			if (this.size === 0) {
				console.log("📭 Buffer is empty!");
				return null;
			}

			const item = this.buffer[this.tail];
			this.tail = (this.tail + 1) % this.capacity;
			this.size--;
			console.log(`📖 Read: ${item} (buffer: ${this.size}/${this.capacity})`);
			return item;
		}

		getRecent() {
			// Return the most recent items without removing them
			const recent = [];
			for (let i = 0; i < this.size; i++) {
				const index = (this.tail + i) % this.capacity;
				recent.push(this.buffer[index]);
			}
			return recent;
		}
	}

	// Simulate sensor readings
	console.log("\n🌡️ TEMPERATURE SENSOR BUFFER:");
	const tempBuffer = new CircularBuffer(5); // Keep only last 5 readings

	// Simulate continuous temperature readings
	const temps = [20.1, 20.3, 20.5, 20.4, 20.6, 20.8, 21.0, 20.9];
	temps.forEach((temp, i) => {
		console.log(`\nMinute ${i + 1}:`);
		tempBuffer.write(`${temp}°C`);
		console.log("Recent readings:", tempBuffer.getRecent());
	});
	// ^ think: why is a circular buffer perfect for continuous sensor data?
	sep();

	// PRIORITY QUEUE - Not all data is equal!
	console.log("PRIORITY QUEUE - VIP Treatment for Important Data:");

	class PriorityQueue {
		constructor() {
			this.items = [];
		}

		enqueue(item, priority) {
			const queueItem = { item, priority };

			// Find correct position to insert based on priority
			let inserted = false;
			for (let i = 0; i < this.items.length; i++) {
				if (queueItem.priority > this.items[i].priority) {
					this.items.splice(i, 0, queueItem);
					inserted = true;
					break;
				}
			}

			if (!inserted) {
				this.items.push(queueItem);
			}

			console.log(`⚡ Queued: ${item} (priority: ${priority})`);
		}

		dequeue() {
			if (this.items.length === 0) {
				console.log("📭 Priority queue is empty!");
				return null;
			}

			const { item, priority } = this.items.shift();
			console.log(`🚀 Dequeued: ${item} (was priority: ${priority})`);
			return item;
		}

		showQueue() {
			console.log("Current queue:");
			this.items.forEach((qi, i) => {
				console.log(`  ${i + 1}. ${qi.item} (priority: ${qi.priority})`);
			});
		}
	}

	// Hospital emergency room queue
	console.log("\n🏥 EMERGENCY ROOM PRIORITY QUEUE:");
	const erQueue = new PriorityQueue();

	erQueue.enqueue("John - Broken arm", 3);
	erQueue.enqueue("Sarah - Heart attack", 10);
	erQueue.enqueue("Mike - Flu symptoms", 1);
	erQueue.enqueue("Lisa - Severe bleeding", 9);

	console.log("\n📋 Queue status:");
	erQueue.showQueue();

	console.log("\n🏥 Treating patients in priority order:");
	while (erQueue.items.length > 0) {
		const patient = erQueue.dequeue();
		console.log(`👨‍⚕️ Treating: ${patient}`);
	}
	sep();

	// PUB/SUB PATTERN - Broadcasting to Multiple Listeners
	console.log("PUB/SUB - Broadcasting Events to Multiple Subscribers:");

	class EventBroadcaster {
		constructor() {
			this.subscribers = {};
			this.eventHistory = [];
		}

		// Subscribe to events
		subscribe(eventType, callback, subscriberId) {
			if (!this.subscribers[eventType]) {
				this.subscribers[eventType] = [];
			}

			this.subscribers[eventType].push({ callback, id: subscriberId });
			console.log(`📡 ${subscriberId} subscribed to '${eventType}' events`);
		}

		// Publish an event to all subscribers
		publish(eventType, data) {
			const event = {
				type: eventType,
				data,
				timestamp: new Date().toISOString(),
				id: `evt_${Math.random().toString(36).substr(2, 9)}`
			};

			this.eventHistory.push(event);

			console.log(`📢 Broadcasting '${eventType}':`, data);

			const subs = this.subscribers[eventType] || [];
			subs.forEach(sub => {
				try {
					sub.callback(event);
				} catch (error) {
					console.log(`❌ Error in subscriber ${sub.id}:`, error.message);
				}
			});

			console.log(`   📊 Delivered to ${subs.length} subscribers`);
		}

		unsubscribe(eventType, subscriberId) {
			if (this.subscribers[eventType]) {
				this.subscribers[eventType] = this.subscribers[eventType]
					.filter(sub => sub.id !== subscriberId);
				console.log(`📴 ${subscriberId} unsubscribed from '${eventType}' events`);
			}
		}

		getStats() {
			const stats = {};
			Object.keys(this.subscribers).forEach(eventType => {
				stats[eventType] = this.subscribers[eventType].length;
			});
			return stats;
		}
	}

	// Build a simple chat system
	console.log("\n💬 CHAT SYSTEM WITH PUB/SUB:");
	const chatBroadcaster = new EventBroadcaster();

	// Different types of subscribers
	function chatDisplay(event) {
		console.log(`   💬 [${event.data.username}]: ${event.data.message}`);
	}

	function moderationBot(event) {
		if (event.data.message.includes('spam')) {
			console.log(`   🤖 MODERATION: Flagged message from ${event.data.username}`);
		}
	}

	function analyticsCollector(event) {
		console.log(`   📈 ANALYTICS: Message length: ${event.data.message.length} chars`);
	}

	function notificationSystem(event) {
		console.log(`   🔔 NOTIFICATION: New message for @everyone`);
	}

	// Subscribe different systems
	chatBroadcaster.subscribe('chat_message', chatDisplay, 'ChatUI');
	chatBroadcaster.subscribe('chat_message', moderationBot, 'ModerationBot');
	chatBroadcaster.subscribe('chat_message', analyticsCollector, 'AnalyticsService');
	chatBroadcaster.subscribe('chat_message', notificationSystem, 'NotificationService');

	console.log("\n📊 Subscriber stats:", chatBroadcaster.getStats());

	// Simulate chat messages
	console.log("\n--- Chat simulation ---");

	chatBroadcaster.publish('chat_message', {
		username: 'Alice',
		message: 'Hello everyone!'
	});

	chatBroadcaster.publish('chat_message', {
		username: 'Bob',
		message: 'Check out this spam link!'
	});

	chatBroadcaster.publish('chat_message', {
		username: 'Charlie',
		message: 'How is everyone doing today?'
	});

	// Unsubscribe and see the difference
	console.log("\n📴 Notification system going offline...");
	chatBroadcaster.unsubscribe('chat_message', 'NotificationService');

	chatBroadcaster.publish('chat_message', {
		username: 'Diana',
		message: 'Is anyone still here?'
	});
	// ^ think: how does pub/sub make systems more flexible? loose coupling!
	sep();

	// STREAM PROCESSING - Processing Data as it Flows
	console.log("STREAM PROCESSING - Real-time Data Transformation:");

	class DataStream {
		constructor(name) {
			this.name = name;
			this.processors = [];
			this.outputs = [];
		}

		// Add processing functions to the stream
		pipe(processorFn, processorName) {
			this.processors.push({ fn: processorFn, name: processorName });
			console.log(`🔧 Added processor: ${processorName} to ${this.name}`);
			return this; // Allow chaining
		}

		// Add output destinations
		output(outputFn, outputName) {
			this.outputs.push({ fn: outputFn, name: outputName });
			console.log(`📤 Added output: ${outputName} to ${this.name}`);
			return this;
		}

		// Process incoming data through the pipeline
		push(data) {
			console.log(`\n📥 ${this.name} received:`, data);

			let processed = data;

			// Run through all processors
			for (let processor of this.processors) {
				try {
					const before = processed;
					processed = processor.fn(processed);
					console.log(`   🔄 ${processor.name}: ${JSON.stringify(before)} → ${JSON.stringify(processed)}`);

					// If processor returns null/undefined, stop the pipeline
					if (processed === null || processed === undefined) {
						console.log(`   ⛔ Pipeline stopped by ${processor.name}`);
						return;
					}
				} catch (error) {
					console.log(`   ❌ Error in ${processor.name}:`, error.message);
					return;
				}
			}

			// Send to all outputs
			this.outputs.forEach(output => {
				try {
					output.fn(processed);
					console.log(`   📤 Sent to ${output.name}`);
				} catch (error) {
					console.log(`   ❌ Error in output ${output.name}:`, error.message);
				}
			});
		}
	}

	// Build a real-time analytics pipeline
	console.log("\n📊 REAL-TIME ANALYTICS PIPELINE:");

	const webLogStream = new DataStream('WebLogStream');

	// Processing functions
	function parseLogEntry(rawLog) {
		// Simulate parsing a web server log
		const parts = rawLog.split(' ');
		return {
			ip: parts[0],
			method: parts[1],
			path: parts[2],
			status: parseInt(parts[3]),
			size: parseInt(parts[4]),
			timestamp: new Date()
		};
	}

	function filterErrors(logEntry) {
		// Only pass through error responses
		return logEntry.status >= 400 ? logEntry : null;
	}

	function enrichWithLocation(logEntry) {
		// Simulate IP geolocation
		const locations = {
			'192.168.1.1': 'New York',
			'10.0.0.1': 'London',
			'172.16.0.1': 'Tokyo'
		};
		return {
			...logEntry,
			location: locations[logEntry.ip] || 'Unknown'
		};
	}

	function calculateThreat(logEntry) {
		// Simple threat scoring
		let threatScore = 0;
		if (logEntry.status === 404) threatScore += 1;
		if (logEntry.status === 500) threatScore += 3;
		if (logEntry.path.includes('admin')) threatScore += 2;
		return { ...logEntry, threatScore };
	}

	// Output functions
	function alertDashboard(data) {
		console.log(`   🚨 ALERT DASHBOARD: ${data.ip} from ${data.location} - Threat: ${data.threatScore}`);
	}

	function securityDatabase(data) {
		console.log(`   🗃️  SECURITY DB: Logged threat from ${data.ip}`);
	}

	function slackNotification(data) {
		if (data.threatScore >= 3) {
			console.log(`   💬 SLACK: High threat detected! ${data.ip} → ${data.path}`);
		}
	}

	// Build the pipeline
	webLogStream
		.pipe(parseLogEntry, 'LogParser')
		.pipe(filterErrors, 'ErrorFilter')
		.pipe(enrichWithLocation, 'GeoEnricher')
		.pipe(calculateThreat, 'ThreatAnalyzer')
		.output(alertDashboard, 'AlertDashboard')
		.output(securityDatabase, 'SecurityDB')
		.output(slackNotification, 'SlackBot');

	// Simulate incoming web logs
	console.log("\n--- Processing web logs ---");

	const sampleLogs = [
		'192.168.1.1 GET /home 200 1234',
		'10.0.0.1 POST /admin/login 404 567',
		'172.16.0.1 GET /api/data 500 0',
		'192.168.1.1 GET /favicon.ico 404 0'
	];

	sampleLogs.forEach(log => webLogStream.push(log));
	sep();

	// BACKPRESSURE - Handling Overload
	console.log("BACKPRESSURE - Handling Data Overload:");

	class BufferedStream {
		constructor(name, bufferSize = 5) {
			this.name = name;
			this.buffer = [];
			this.bufferSize = bufferSize;
			this.isProcessing = false;
			this.droppedCount = 0;
		}

		push(data) {
			if (this.buffer.length >= this.bufferSize) {
				console.log(`⚠️  ${this.name} buffer full! Dropping:`, data);
				this.droppedCount++;
				return false; // Indicate backpressure
			}

			this.buffer.push(data);
			console.log(`📥 ${this.name} buffered:`, data, `(${this.buffer.length}/${this.bufferSize})`);

			// Start processing if not already running
			if (!this.isProcessing) {
				this.processBuffer();
			}

			return true; // Successfully buffered
		}

		async processBuffer() {
			this.isProcessing = true;

			while (this.buffer.length > 0) {
				const item = this.buffer.shift();
				console.log(`🔄 ${this.name} processing:`, item);

				// Simulate slow processing
				await new Promise(resolve => setTimeout(resolve, 100));

				console.log(`✅ ${this.name} completed:`, item);
			}

			this.isProcessing = false;

			if (this.droppedCount > 0) {
				console.log(`📊 ${this.name} stats: ${this.droppedCount} items dropped due to backpressure`);
			}
		}

		getStats() {
			return {
				bufferSize: this.buffer.length,
				isProcessing: this.isProcessing,
				dropped: this.droppedCount
			};
		}
	}

	// Simulate a slow image processing service
	console.log("\n🖼️ IMAGE PROCESSING WITH BACKPRESSURE:");
	const imageProcessor = new BufferedStream('ImageProcessor', 3);

	// Rapid burst of images
	console.log("Uploading images rapidly...");
	const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg'];

	images.forEach((image, i) => {
		setTimeout(() => {
			const success = imageProcessor.push(image);
			if (!success) {
				console.log(`😞 ${image} was rejected - try again later!`);
			}
		}, i * 10); // Rapid uploads
	});

	// Show stats after processing
	setTimeout(() => {
		console.log("\n📊 Final stats:", imageProcessor.getStats());
	}, 1000);
	// ^ think: how would you handle backpressure in a real system? rate limiting? load balancing?
	sep();

	// WINDOWING - Analyzing Data in Time Windows
	console.log("WINDOWING - Analyzing Data Over Time:");

	class SlidingWindow {
		constructor(windowSize, slideInterval) {
			this.windowSize = windowSize; // How much time each window covers
			this.slideInterval = slideInterval; // How often to create new window
			this.data = [];
			this.windows = [];

			// Start the windowing process
			this.startWindowing();
		}

		addData(value) {
			const now = Date.now();
			this.data.push({ value, timestamp: now });
			console.log(`📈 Added data point: ${value} at ${new Date(now).toISOString().substr(14, 8)}`);

			// Clean old data (older than window size)
			const cutoff = now - this.windowSize;
			this.data = this.data.filter(d => d.timestamp > cutoff);
		}

		startWindowing() {
			setInterval(() => {
				this.createWindow();
			}, this.slideInterval);
		}

		createWindow() {
			const now = Date.now();
			const windowStart = now - this.windowSize;

			// Get data in current window
			const windowData = this.data.filter(d => d.timestamp > windowStart);

			if (windowData.length > 0) {
				const values = windowData.map(d => d.value);
				const avg = values.reduce((a, b) => a + b, 0) / values.length;
				const max = Math.max(...values);
				const min = Math.min(...values);

				const window = {
					start: new Date(windowStart).toISOString().substr(14, 8),
					end: new Date(now).toISOString().substr(14, 8),
					count: values.length,
					avg: avg.toFixed(1),
					max,
					min
				};

				console.log(`🪟 Window [${window.start}-${window.end}]: count=${window.count}, avg=${window.avg}, max=${window.max}, min=${window.min}`);
				this.windows.push(window);

				// Keep only recent windows
				if (this.windows.length > 10) {
					this.windows.shift();
				}
			}
		}
	}

	// Simulate real-time metrics (like CPU usage)
	console.log("\n💻 REAL-TIME CPU MONITORING:");
	const cpuMonitor = new SlidingWindow(3000, 1000); // 3-second windows, update every 1 second

	// Simulate CPU readings
	console.log("Simulating CPU readings...");
	let reading = 0;
	const simulator = setInterval(() => {
		// Generate realistic CPU usage (0-100%)
		const baseUsage = 30 + Math.sin(reading * 0.1) * 20; // Oscillating pattern
		const noise = (Math.random() - 0.5) * 10; // Random variation
		const cpu = Math.max(0, Math.min(100, Math.round(baseUsage + noise)));

		cpuMonitor.addData(cpu);
		reading++;

		// Stop after 15 readings
		if (reading >= 15) {
			clearInterval(simulator);
			console.log("\n🏁 CPU monitoring stopped");
		}
	}, 200); // New reading every 200ms

	// TODO: WISDOM: Streams and real-time data are everywhere:
	// - Queues handle bursty traffic and ensure fair processing
	// - Circular buffers keep recent data without memory growth
	// - Priority queues ensure important data gets processed first
	// - Pub/Sub decouples systems and enables real-time features
	// - Stream processing transforms data as it flows
	// - Backpressure prevents system overload
	// - Windowing enables real-time analytics and monitoring
	// - Remember: Design for the flow, not just the data!
	sep();
})();





/*
----
HELPERS
----
*/


function json_to_yaml(json, options = {}) {
	const {
		indent = 2,
		quoteStrings = 'auto',
		sortKeys = false
	} = options;

	const indentStr = ' '.repeat(indent);

	function needsQuotes(str) {
		if (quoteStrings === 'always') return true;
		if (quoteStrings === 'never') return false;

		if (str === '') return true;
		if (str.match(/^[\d\-+\.eE]+$/)) return true;
		if (str.match(/^(true|false|null|yes|no|on|off)$/i)) return true;
		if (str.match(/[\n\r\t]/) || str.includes('#') || str.includes(':')) return true;
		if (str.match(/^[\s]/) || str.match(/[\s]$/)) return true;
		return false;
	}

	function formatValue(value, depth = 0) {
		if (value === null || value === undefined) return 'null';
		if (typeof value === 'boolean') return value.toString();
		if (typeof value === 'number') return value.toString();

		if (typeof value === 'string') {
			if (needsQuotes(value)) {
				return `'${value.replace(/'/g, "''")}'`;
			}
			return value;
		}

		if (Array.isArray(value)) {
			if (value.length === 0) return '[]';

			return value.map(item => {
				const baseIndent = indentStr.repeat(depth);
				if (typeof item === 'object' && item !== null) {
					const lines = formatObject(item, depth + 1).split('\n');
					const firstLine = lines[0];
					const restLines = lines.slice(1);

					let result = `${baseIndent}- ${firstLine}`;
					if (restLines.length > 0) {
						const itemIndent = indentStr.repeat(depth + 1);
						result += '\n' + restLines.map(line => itemIndent + line).join('\n');
					}
					return result;
				} else {
					return `${baseIndent}- ${formatValue(item, depth + 1)}`;
				}
			}).join('\n');
		}

		if (typeof value === 'object' && value !== null) {
			return formatObject(value, depth);
		}

		return String(value);
	}

	function formatObject(obj, depth) {
		const keys = sortKeys ? Object.keys(obj).sort() : Object.keys(obj);
		if (keys.length === 0) return '{}';

		const baseIndent = indentStr.repeat(depth);

		return keys.map(key => {
			const keyStr = needsQuotes(key) ? `'${key}'` : key;
			const value = obj[key];

			if (typeof value === 'object' && value !== null) {
				if (Array.isArray(value)) {
					if (value.length === 0) {
						return `${keyStr}: []`;
					} else {
						const arrayContent = formatValue(value, depth);
						return `${keyStr}:\n${arrayContent}`;
					}
				} else {
					if (Object.keys(value).length === 0) {
						return `${keyStr}: {}`;
					} else {
						const objectContent = formatObject(value, depth + 1);
						const indentedContent = objectContent.split('\n')
							.map(line => indentStr + line)
							.join('\n');
						return `${keyStr}:\n${indentedContent}`;
					}
				}
			} else {
				return `${keyStr}: ${formatValue(value, depth)}`;
			}
		}).join('\n');
	}

	return '---\n' + formatValue(json);
}

function json_to_xml(json, indent = 0) {
	// A function to convert JSON to pretty-printed XML
	let xml = '';
	const indentStr = '  '.repeat(indent); // 2 spaces per indent level

	for (const prop in json) {
		if (json.hasOwnProperty(prop)) {
			xml += `${indentStr}<${prop}>`;

			if (typeof json[prop] === 'object' && json[prop] !== null) {
				if (Array.isArray(json[prop])) {
					// Handle arrays
					xml += '\n';
					for (let i = 0; i < json[prop].length; i++) {
						xml += `${indentStr}  <item>\n`;
						if (typeof json[prop][i] === 'object') {
							xml += json_to_xml(json[prop][i], indent + 2);
						} else {
							xml += `${indentStr}    ${json[prop][i]}\n`;
						}
						xml += `${indentStr}  </item>\n`;
					}
					xml += `${indentStr}`;
				} else {
					// Handle objects
					xml += '\n';
					xml += json_to_xml(json[prop], indent + 1);
					xml += `${indentStr}`;
				}
			} else {
				// Handle primitive values
				xml += json[prop];
			}
			xml += `</${prop}>\n`;
		}
	}
	return xml;
}

function json_to_csv(json) {
	if (!Array.isArray(json)) json = [json]; // Ensure json is an array for consistency
	// A simple function to convert JSON to CSV
	const keys = Object.keys(json[0]);
	const csv = json.map(row => keys.map(key => row[key]).join(',')).join('\n');
	return `${keys.join(',')}\n${csv}`;
}

function prettyTable(str, options = {}) {

	const {
		border = true,
		headerSeparator = true,
		alignment = 'left', // 'left', 'right', 'center'
		padding = 1,
		style = 'default', // 'default', 'minimal', 'box', 'rounded', 'double', 'colored'
		colors = false
	} = options;

	// Style configurations
	const styles = {
		default: {
			corner: { tl: '┌', tr: '┐', bl: '└', br: '┘' },
			border: { h: '─', v: '│', cross: '┼', tDown: '┬', tUp: '┴', tLeft: '┤', tRight: '├' }
		},
		box: {
			corner: { tl: '+', tr: '+', bl: '+', br: '+' },
			border: { h: '-', v: '|', cross: '+', tDown: '+', tUp: '+', tLeft: '+', tRight: '+' }
		},
		rounded: {
			corner: { tl: '╭', tr: '╮', bl: '╰', br: '╯' },
			border: { h: '─', v: '│', cross: '┼', tDown: '┬', tUp: '┴', tLeft: '┤', tRight: '├' }
		},
		double: {
			corner: { tl: '╔', tr: '╗', bl: '╚', br: '╝' },
			border: { h: '═', v: '║', cross: '╬', tDown: '╦', tUp: '╩', tLeft: '╣', tRight: '╠' }
		}
	};

	const currentStyle = styles[style] || styles.default;
	const useBorder = border && style !== 'minimal';
	const useColors = colors || style === 'colored';

	// Parse CSV string into rows
	const rows = str.split('\n').filter(row => row.trim()).map(row => row.split(','));
	if (rows.length === 0) return '';

	// Calculate maximum width for each column
	const maxLengths = rows[0].map((_, colIndex) =>
		Math.max(...rows.map(row => (row[colIndex] || '').toString().length))
	);

	// Function to align text within a cell
	function alignText(text, width, align) {
		const str = text.toString();
		const totalPadding = width - str.length;

		switch (align) {
			case 'right':
				return str.padStart(width);
			case 'center':
				const leftPad = Math.floor(totalPadding / 2);
				const rightPad = totalPadding - leftPad;
				return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
			default: // 'left'
				return str.padEnd(width);
		}
	}

	// Function to add colors
	function colorText(text, isHeader = false) {
		if (!useColors) return text;
		if (isHeader) {
			return `\x1b[1m\x1b[36m${text}\x1b[0m`; // Bold cyan for headers
		}
		return text;
	}

	// Create padded cells
	const paddedRows = rows.map((row, rowIndex) =>
		row.map((cell, colIndex) => {
			const paddedCell = ' '.repeat(padding) +
				alignText(cell || '', maxLengths[colIndex], alignment) +
				' '.repeat(padding);
			return colorText(paddedCell, rowIndex === 0);
		})
	);

	let result = '\n';

	if (useBorder) {
		// Top border
		const topBorder = currentStyle.corner.tl +
			maxLengths.map(len => currentStyle.border.h.repeat(len + padding * 2))
				.join(currentStyle.border.tDown) +
			currentStyle.corner.tr;
		result += topBorder + '\n';
	}

	// Add rows
	paddedRows.forEach((row, rowIndex) => {
		const rowStr = (useBorder ? currentStyle.border.v : '') +
			row.join(useBorder ? currentStyle.border.v : ' | ') +
			(useBorder ? currentStyle.border.v : '');
		result += rowStr + '\n';

		// Add separator after header
		if (headerSeparator && rowIndex === 0 && rows.length > 1) {
			if (useBorder) {
				const separator = currentStyle.border.tRight +
					maxLengths.map(len => currentStyle.border.h.repeat(len + padding * 2))
						.join(currentStyle.border.cross) +
					currentStyle.border.tLeft;
				result += separator + '\n';
			} else {
				const separator = maxLengths.map(len => '-'.repeat(len + padding * 2))
					.join('-+-');
				result += separator + '\n';
			}
		}
	});

	if (useBorder) {
		// Bottom border
		const bottomBorder = currentStyle.corner.bl +
			maxLengths.map(len => currentStyle.border.h.repeat(len + padding * 2))
				.join(currentStyle.border.tUp) +
			currentStyle.corner.br;
		result += bottomBorder;
	}

	return result;
}

debugger;