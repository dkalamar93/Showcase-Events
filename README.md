# Eventio

## For development

```sh
$ yarn install
$ yarn start
```

Hi Anna, thank you for taking over this project due to my upcoming vacation.
Unfortunately due to my full-time job I wasn't able to accomplish as much as I would like to. This summary should help you to catch up and take the project further.

## LOGIN

The login page is finished alongside the fully implemented authentication. All of the pages require the users to authenticate. Authentication is determined based on a valid refresh token stored in Cookies. Upon token expiration, the users are redirected to the Login page automatically.

**TODO**: Please, implement visual feedback for inputs, when the user enters invalid credentials. The grey underline should turn red and it should be clear was is the error message.

## SIGN UP

In the top right-hand corner, you can find a link to the sign-up page. It is visible for users without any account. The sign-up logic is unfortunately not yet implemented.

**TODO**: Finish the sign-up flow. You can find all designs in Figma.

## ERROR PAGES

I've also implemented a 404 page. It is used when the user tries to access a page that does not exist. There is a refresh button that redirects them to the dashboard page.

Page down - for the general error - is not implemented.

**TODO**: Implement page down

## DASHBOARD

The dashboard has two possible data visualizations, with a way to switch between them
"Boxes" view, using a standard rectangular card
"List" view, using a full-width list

Each card has a button for joining, leaving, editing an event. In the right bottom corner of the whole page is a button for creating new events. Unfortunately, I didn't have time to implement a loading page.

**TODO**: Implement the loading dashboard component.
NICE TO HAVE: It might be worth a while to extract ContainerFilters from the dashboard page to a new separate component.

## CREATE EVENT

Create event page has one issue. I couldn't find any suitable time picker library during the limited time window. Even though there is an input in its place it has a suboptimal design.

**TODO**: Look for any suitable time picker libraries or improve the design of the current input.

## EDIT EVENT

Edit event is not implemented. Please beware that the edit button from the dashboard temporarily takes you to Create Event page.

**TODO**: Implement Edit Event page with both design and logic. It will be similar to Create Event form while maintaining Event Detail layout
**TODO**: Implement Delete Event

## PROFILE

The profile page is not implemented.

**TODO**: Implement design and logic of profile page. Boxes should be reused from the dashboard box view.

## ERROR

Same as in the login page, please revisit all of the forms and make sure they have correct error highlighting and proper descriptions.

**TODO**: Error highlight and error descriptions.

## NOTES:

All implemented pages are fully responsive, please keep that in mind while implementing new pages. The minimum supported width is 320px.
For different devices use SCREEN sizes from constants,

Colors from constants, in case you need to add any color name it according to [colornamer.netlify.appv](https://colornamer.netlify.app/) so we maintain some consistency throughout the project.

Also in case, I find some extra time before leaving for my vacation I might squeeze in another commit because I really enjoyed working on this project and would love to maintain it further.

If you have any further questions don't hesitate to contact me.

Cheers,
Dominik
