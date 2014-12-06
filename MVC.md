### All About MVC -- Model-View-Controller
====
#### Models: Nouns

* List of Posts: Collection
  * Properties:
  * Methods:
    * CRUD
    * Add a post
    * Remove a post
    * Edit / update a specific post
    * Most recently updated post displays on top
* Post
  * Properties:
    * Cards names and quantities
    * Haves and wants
    * Author and details (Name, shop, email)
  * Methods:
    * Create post
    * Edit the haves / wants of a post
    * Delete specific items from haves / wants
    * Delete entire post
    * Store post in collection of posts

#### Controllers:

* Workflows:
  * Edit a specific post:
    * Get a specific post by author / cards / shop
    * Edit the post and save changes
    * Display the view of the list of all posts for that city
  * Add a new post:
    * Accept input: Search autcomplete to find card names / dropdown for quantity
    * Add cards to have / wants
    * Add misc items via textarea 
    * Add the new post to the collection of posts
    * Display the view of all posts in the area

#### Views: Display Items

* Map of United States (Home page)
  * Click state to display cities
  * Click city to go to list of posts
* List of Individual Posts
  * Filtered by:
    * Last updated
    * Shop
    * Card
    * Name
* Individual Post
  * Date posted
  * Date last updated
  * Listed by date last updated
  * Auto delete after 30 days of no update?
  * Delete whole post manually
  * Haves / Wants
  * Name / Shop / Title
  * Misc Items
* Add a Post
* Edit a Post
