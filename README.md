# Teachable frontend takehome
# Noreen Wu
# October 28, 2019

# Overview
This React application implements a search application that takes a user's search query,
hits the [Ruby Gems](https://rubygems.org/) search API endpoint, and displays the results
in a list view. Users may optionally save and unsave any of these results. Saved results
are stored in localStorage, so the browser may be refreshed, and the user's saved results
persist (for that browser).


## User Interface

There are two modes in this application: the user is either looking for gems or consulting
his/her list of saved gems. To support these 2 functions, the buttons "Find Gems" and "Saved Gems"
are at the top of the application. When the user clicks on "Find Gems," both the Find Gems
button and the input field highlight as a unit (subtly), and the cursor is programmatically
placed in the input field.

There is no submit button for the queries. Rather, any change made to the query triggers
a lookup. This is convenient but does create issues as the user can type faster than
the network retrievals occur. For this reason, the module react-debounce-input is utilized,
to even out the user's rapidly incoming keystrokes.



## Implementation Notes




## Required Files


## Testing

Tested primarily on Mac OSX Chrome, some on MacOSX Firefox. Firefox input[type=search]
does not display the X to cancel one's search.

Media queries are included in the CSS to allow for resizing to small viewports.
