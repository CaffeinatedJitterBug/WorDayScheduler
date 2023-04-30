// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const timeBlock = $('.time-block');
  const currentHour = dayjs().format('H');
  const timeTags = ['#hour-9', '#hour-10', '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17']

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  timeBlock.on('click', function(e) {
    const event = e.target;
    if (event.matches('button')) {
      const hour = $(this).attr('id');
      const textA = $(this).children('.description').val();
      localStorage.setItem(hour, textA);
    }
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  for (x=0; x<timeTags.length; x++) {
    const tag = timeTags[x];
    const match = tag.match(/\d+/);
    const matchTag = parseInt(match[0], 10);

    if (matchTag < currentHour) {
      $(timeTags[x]).addClass('past');
    } else if (matchTag === currentHour) {
      $(timeTags[x]).addClass('present');
    } else if (matchTag > currentHour) {
      $(timeTags[x]).addClass('future');
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  for (x=0; x<timeTags.length; x++) {
    const local = localStorage.key(x);
    const plannerText = localStorage.getItem(local);
    $(timeTags[x]).children('.description').val(plannerText);
  }

  // TODO: Add code to display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMM D'));
});
