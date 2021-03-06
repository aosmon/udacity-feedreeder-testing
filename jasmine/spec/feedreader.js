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
    /* This suite is all about the RSS feeds definitions,
     *  the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* A first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('have URL defined and the URLs are not empty', function(){
            allFeeds.forEach(function(entry){
                expect(entry.url).toBeDefined();
                expect(entry.url.length).not.toBe(0);
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined and the names are not empty', function(){
            allFeeds.forEach(function(entry){
                expect(entry.name).toBeDefined();
                expect(entry.name.length).not.toBe(0);
            });
        });
        
    });

    describe('The menu', function(){
    /* Test suite named "The menu" */
        
        /* A test that ensures the menu element is
         * hidden by default.
        */

        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('shows/hides when clicked', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
    describe('Initial Entrees', function(){
    /* Test suite named "Initial Entrees" */
               
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
       
        it('after loadFeed is completed, there is at least a single .entry element within the .feed container', function(done){
            expect($('.feed').children('.entry-link').length).not.toBe(0);
            done();
        });
        
    });
    
    describe('New Feed Selection', function(done){
    /* Test suite named "New Feed Selection" */

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         *
         * Initial feed is loaded and its content is captured
         * Second feed is loaded and its content compared to 
         * the first one
         */
        var initialFeed;
        beforeEach(function(done){
           loadFeed(0, function(){
            initialFeed = document.querySelector('.feed').innerHTML;
            });
           loadFeed(1, function(){
            done();
           });
        });
       
        it('when a new feed is loaded, the content changes', function(done){
            var newFeed = document.querySelector('.feed').innerHTML;
            expect(initialFeed).not.toBe(newFeed);
            done();
        });
        
    });
        
        
}());
