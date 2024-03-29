/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed has URL defined', function() {
             allFeeds.forEach(function callback(currentValue, index) {
                 expect(allFeeds[index].url).toBeDefined();
                 expect(allFeeds[index].url.length).not.toBe(0);
             });
         })


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed has a name', function() {
             allFeeds.forEach(function callback(currentValue, index) {
                 expect(allFeeds[index].name).toBeDefined();
                 expect(allFeeds[index].name.length).not.toBe(0);
             })
         })
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         
         // Jasmine jQuery $
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        })

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          
        it('toggle click event on the hamburger button to hide/show menu', function() {
            // click, show menu, 'class menu-hidden' disappear
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
            
    });
        

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
         // Asinc stuff to call before doing asinc test
         beforeEach(function(done) {
             loadFeed(0, function() {
                done(); // required
             });
         });
         
         // there is at least one '.entry element' in the '.feed' container
         it('.entry in .feed', function() {
             expect( $('.feed .entry').length).toBeGreaterThan(0);
         });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let firstFeed, secondFeed;
        let input1 = 2;
        let input2 = 3;

        // required for 'asinc' do these things before do the it() test
        beforeEach(function(done) {

            loadFeed(input1, function() {
                // console.log(`feed ${input1} name: ${allFeeds[input1].name}`);
                // console.log(`feed ${input1} stuff: ${ $('.feed').html() }`);
                firstFeed = $('.feed').html();    
                
                // loading 'secondFeed' inside the 'firstFeed'
                loadFeed(input2, function() {
                    // console.log(`feed ${input2} name: ${allFeeds[input2].name}`);
                    // console.log(`feed ${input2} stuff: ${ $('.feed').html() }`);
                    secondFeed = $('.feed').html(); // array of html 'tags'
                    done(); // required
                });    

            });

        });

        // Jasmine test, 2 'things' are NOT equal
        it('checks if two feeds are different', function() {
            // 'expect' that stuff in 'firstFeed' is not the same as stuff in 'secondFeed'
            expect(firstFeed).not.toEqual(secondFeed);
        });

    });
        
}());
