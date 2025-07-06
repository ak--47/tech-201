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
	console.log('LESSON 0: A Review of Primitives\n\tthis is all there is!');
	sep();
	// Primitives are the most basic data types in JavaScript.
	// They include: string, number, boolean, null, undefined, and symbol.
	// Each primitive represents a single value and has immutable characteristics.
	const aString = "Hello, World!";
	console.log("Strings look like this:", aString);
	const aNumber = 42;
	console.log("Numbers look like this:", aNumber);
	const aBoolean = true;
	console.log("Booleans look like this:", aBoolean);
	sep();

	// some languages will have different representations for "empty" state
	const aNull = null;
	console.log("Null looks like this:", aNull);
	const anUndefined = undefined;
	console.log("Undefined looks like this:", anUndefined);
	sep();

	// Symbols are a unique and immutable primitive value that can be used as object property keys.
	const aSymbol = Symbol("unique");
	console.log("Symbols look like this:", aSymbol);
	const anotherSymbol = Symbol("unique");
	console.log("Symbols are unique, so `aSymbol` is not equal to `anotherSymbol`:", aSymbol === anotherSymbol);
	// ^ think to yourself... why might 'unique symbols' be a valuable data type?
	sep();

	// we also have BigInt for large integers
	const aBigInt = BigInt(1234567890123456789012345678901234567890);
	console.log("BigInt looks like this:", aBigInt);
	//and decimals (floats)
	const aFloat = 3.14159;
	console.log("Floats look like this:", aFloat);
	// ^ think to yourself... why might numerical precision be critical for every application?
	sep();

	// you can always check the type of a variable using the typeof operator
	console.log("The type of aString is:", typeof aString);
	console.log("The type of aNumber is:", typeof aNumber);
	console.log("The type of aBoolean is:", typeof aBoolean);
	console.log("The type of aNull is:", typeof aNull);
	console.log("The type of anUndefined is:", typeof anUndefined);
	console.log("The type of aSymbol is:", typeof aSymbol);
	console.log("The type of aBigInt is:", typeof aBigInt);
	console.log("The type of aFloat is:", typeof aFloat);
	// TODO: WISDOM: you never fully understand the problem until you concretely know all the primitives involved ! 
	sep();
})();


// MODULE 1: OBJECTS AND ARRAYS
(function a_review_of_objects_and_arrays() {
	bigSep();
	console.log('LESSON 1: A Review of Objects and Arrays\n\t{} and [] are how we ORGANIZE primitives');
	sep();
	// objects are UNORDERED collections of key:value pairs, where keys are strings (or Symbols) 
	// ? and values can be ANY data type, allowing for nested structures.
	const anObject = {
		name: "Alice",
		age: 30,
		isStudent: false,
		anotherObject: {}
	};
	console.log("Objects look like this:", anObject);
	console.log("Accessing properties:", anObject.name, anObject.age, anObject.isStudent);

	sep();

	// arrays are ORDERED collections of values at numerical index, which can be of any type.
	const anArray = [1, 2, 3, "four", true];
	console.log("Arrays look like this:", anArray);
	console.log("Accessing elements:", anArray[0], anArray[3]);
	// ^ think: what is the difference between a 'key' (in {}) and an 'index' (in []) ?
	sep();


	// importantly, arrays can also contain objects, which is foundational to how we model 'collections of things'
	const anArrayOfObjects = [
		{ name: "Charlie", age: 25 },
		{ name: "Diana", age: 28 }
	];
	console.log("Array of Objects:", anArrayOfObjects);
	console.log("Accessing elements in Array of Objects:", anArrayOfObjects[0].name, anArrayOfObjects[1].age);
	sep();

	// You can also use methods to manipulate objects and arrays.
	anObject.greet = function () {
		return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
	};
	console.log("Using a method on an object:", anObject.greet());
	anArray.push("new item");
	console.log("After adding a new item to the array:", anArray);
	sep();

	console.log("Objects do not guarantee order:", Object.keys(anObject));
	console.log("Arrays guarantee order:", anArray.map((item, index) => `${index}: ${item}`));
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

	// CSV (Comma-Separated Values) is a simple format for tabular data

	const csvString = json_to_csv(anObject);
	console.log("CSV String:", prettyTable(csvString));
	sep();

	// YAML (YAML Ain't Markup Language) is a human-readable data serialization format
	const yamlString = json_to_yaml(anObject);
	console.log("YAML String:\n", (yamlString));
	sep();

	// Each format has its own use cases and advantages.
	// JSON is widely used for APIs and web applications due to its simplicity and ease of use
	// XML is often used in configuration files and data interchange between systems
	// CSV is commonly used for spreadsheets and tabular data
	// YAML is often used for configuration files due to its readability
	// ^ think: why might you choose one format over another? what are the tradeoffs? critical design decision!

	//are they completely interchangeable? let try something more complex
	console.log("JSON and XML can represent complex data structures, while CSV is more suited for flat data; let's see an example:\n");
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

	console.log("\nComplex Data in JSON:\n", JSON.stringify(complexData, null, 2));
	sep();
	// XML can represent this data, but it would be more verbose
	console.log("\nComplex Data in XML:\n", json_to_xml(complexData));
	sep();
	// CSV would not be suitable for this structure as it cannot represent nested objects or arrays
	console.log("Complex Data in CSV:\n", `users/name,users/age,users/hobbies/0,users/hobbies/1,users/address/city,users/address/zip,users/address/friends/0/name,users/address/friends/0/age,users/address/friends/1/name,users/address/friends/1/age,users/address/friends/1/friends/0/name,users/address/friends/1/friends/0/age,users/address/friends/1/friends/1/name,users/address/friends/1/friends/1/age,users/address/friends/1/friends/1/friends/0/name,users/address/friends/1/friends/1/friends/0/age,users/address/friends/2/name,users/address/friends/2/age
Alice,30,reading,gaming,Wonderland,12345,,,,,,,,,,,,
Bob,25,hiking,cooking,Builderland,67890,,,,,,,,,,,,
Eve,22,,,Techville,54321,Charlie,25,Diana,28,Edgar,42,Fiona,30,George,35,Lynn,22
`);
	sep();
	// YAML would be a trip
	console.log("Complex Data in YAML:\n", json_to_yaml(complexData));
	sep();
	// TODO: WISDOM: JSON is the most flexible AND the most verbose data format (it's also native to javascript! the language of the people)

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

	// Save the original grade
	const originalGrade = gradeLedger.chain[1].data.grade;
	console.log("\nOriginal grade for Alice:", originalGrade);

	// Someone tries to tamper with Alice's grade
	console.log("Attempting to change Alice's grade to 100...");
	gradeLedger.chain[1].data.grade = 100;

	console.log("Modified grade:", gradeLedger.chain[1].data.grade);
	console.log("Validation:", gradeLedger.isValid());
	console.log("\nThe blockchain detected tampering! The hash no longer matches!");

	// What if they try to recalculate the hash?
	console.log("\nWhat if they recalculate the hash after tampering?");
	gradeLedger.chain[1].hash = gradeLedger.chain[1].calculateHash();
	console.log("New hash:", gradeLedger.chain[1].hash);
	console.log("Validation:", gradeLedger.isValid());
	console.log("\nStill invalid! Block 2 expects a different previousHash!");
	// ^ think: why does changing one block affect all subsequent blocks?

	// Restore the original
	gradeLedger.chain[1].data.grade = originalGrade;
	gradeLedger.chain[1].hash = gradeLedger.chain[1].calculateHash();
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
		student: "Alice",
		badge: "🌟 Perfect Attendance",
		month: "January"
	});

	achievementChain.addBlock({
		type: "achievement",
		student: "Bob",
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