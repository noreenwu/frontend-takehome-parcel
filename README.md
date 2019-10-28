# Teachable frontend takehome
# Noreen Wu
# October 28, 2019

# Overview
This React application implements a search application that takes a user's search query,
hits the [Ruby Gems](https://rubygems.org/) search API endpoint, and displays the results
in a list view. Users may optionally save and unsave any of these results. Saved results
are stored in localStorage, so the browser may be refreshed, and the user's saved results
persist (for that browser).

## Installation

To view this application, please follow these steps:
  * git clone from https://github.com/noreenwu/frontend-takehome-parcel

  * cd into the newly created directory (frontend-takehome-parcel)

  * npm install

  * npm run dev - to start the backend server on port 3000 and the frontend application on localhost: 1234

  * Visit localhost:1234 in your browser


## User Interface

There are two modes in this application: the user is either looking for gems or consulting
his/her list of saved gems. To support these 2 functions, the buttons "Find Gems" and "Saved Gems"
are at the top of the application. When the user clicks on "Find Gems," both the Find Gems
button and the input field highlight as a unit, and the cursor is programmatically
placed in the input field. When the user clicks "Saved Gems," only this button highlights.

There is no submit button for the queries. Rather, any change made to the query triggers
a lookup. This is convenient but does create issues as the user may type faster than
network retrievals occur. For this reason, the module react-debounce-input is utilized,
to even out the user's rapidly incoming keystrokes.


## Implementation Notes




## Required Files (in src)

index.html - this is the starter page for the application. parcel starts the front-end server with
      this file.

index.js - this file is loaded by index.html. It incorporates React and renders the App from App.js

App.js - this file defines the structure of the app, just a header with the functionality below.
      The driver of the functionality is in Dashboard, which it calls.

components/Dashboard.js - this is the primary component of the App which pulls any saved gems
      from localStorage on mounting. It also displays the 3 form elements and controls their functions.
      The http GET request is kicked off whenever there is a change to the query input field.
      These results, capped at 35 (see utils/helpers), are passed to SearchResults where they are displayed.

components/SearchResults.js -  this is where



## Testing

Tested primarily on Mac OSX Chrome, some on Mac OSX Firefox. Firefox input[type=search]
does not display the X to cancel one's search.

Media queries are included in the CSS to allow for resizing to small viewports.

Aria-labels were added to the input field, save/unsave buttons and resources links,
so that the purpose of these elements are understandable by assistive technologies
and their users.
