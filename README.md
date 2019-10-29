# Teachable frontend takehome
# Noreen Wu
# October 28, 2019

# Overview
This React application allows a user to search for and optionally save RubyGems.
Saved results are stored in the browser's localStorage; the saved items persist
after browser refresh.


## Installation

To view this application, please follow these steps:
  * git clone from https://github.com/noreenwu/frontend-takehome-parcel

  * cd into your newly created directory (frontend-takehome-parcel)

  * npm install

  * npm run dev - to start the backend server on port 3000 and the frontend application on localhost: 1234

  * Visit localhost:1234 in your browser


## User Interface

There are two modes in this application: the user is either looking for gems or consulting
his/her list of saved gems. To support these 2 functions, the buttons "Find Gems" and "Saved Gems"
are at the top of the application. When the user clicks on "Find Gems," both the Find Gems
button and the input field highlight as a unit, and the cursor is programmatically
placed in the input field. When the user clicks "Saved Gems," only this button highlights,
and any saved results are displayed.

There is no submit button for the queries. Rather, any change made to the query triggers
a lookup. This is convenient but does create issues as the user may type faster than
network retrievals occur. For this reason, the module react-debounce-input is utilized,
to even out a user's rapidly incoming keystrokes.


## Implementation Notes

The search results take on several different forms. When retrieved from the server, they
are in a simple array. But savedItems are instead kept as a collection of objects. This
facilitates storage to localStorage (which is key/value-based) but also makes it
faster to determine whether something has been saved or not. This efficiency in lookup
is important, because as new search results are rendering, the application needs to
know, for every returned result, whether the item has already been saved or not (and
accordingly display either Save or Unsave). Finally, the search results are also put into
a paginated format that allows the results to be viewed one page at a time.

Because saved results and results based on an active query actually display the same
information with different data, the same components (SearchResults, Listing, GemReference, ResultsNav),
are utilized for both purposes.


## Required Files (in src)

index.html - this is the starter page for the application. parcel starts the front-end server with
      this file.

index.js - this file is loaded by index.html. It incorporates React and renders the App from App.js

App.js - this file is the entrypoint for React code, and calls the central driver of the app, Dashboard

components/Dashboard.js - this component coordinates the high-level functionality of the app. On mounting,
      it pulls any saved gems from localStorage. It also displays the 3 form elements and defines their functions.
      The http GET request to the RubyGems reference is kicked off whenever there is a change to the query input field.
      These results, capped at 35 (see utils/helpers), are passed to SearchResults where they are displayed.

components/SearchResults.js -  this is where the display of search results is defined. The results
      are paginated and page 1 is by default shown. This component needs to update the page shown
      if the user changes the page, by using links rendered by ResultsNav. This component is used
      for both active search results and saved results.

components/ResultsNav.js - called by SearchResults, this component shows the user what page they are on
      and allows them to move to the next or previous pages, if available.


components/SavedView.js - the main purpose of SavedView, a stateless functional component, is to get
      the saved results into a form that allows resuse of the component SearchResults

components/Listing.js - this component is responsible for the display of a single search result (or saved item)

components/GemReference.js - each Listing may have one or more links to related references. Given a target
      and its url, this component renders that link

utils/helpers.js - this file contains functions that facilitate some of the formatting that needs to happen
      throughout the application. For example, each search result contains quite a bit of information
      about the RubyGem, some of which is useful to display and some of which is often blank. The function
      formatItem pulls out the fields that are to be displayed or used, and also helps get them into a
      format that is easy to save to localStorage, and which facilitates easy lookup. The functions for saving to
      or deleting from localStorage are also here. getAllFromStorage retrieves everything from localStorage
      on application start-up. Finally, the paginate function puts the search results into page-by-page form.

utils/SearchAPI.js - the getting of the search results from the provided backend server is defined here

App.css - contains the styling for the app

package.json - defines the environment needed for the app to run


## Testing

Tested on Mac OSX Chrome, some on Mac OSX Firefox. Firefox input[type=search] does not display the X to
cancel one's search.

Media queries are included in the CSS to allow for resizing to small viewports.

Aria-labels have been added to the input field, save/unsave buttons and resources links,
so that the purpose of these elements are understandable by assistive technologies
and their users.
