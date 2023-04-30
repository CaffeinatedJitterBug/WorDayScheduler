// Runs all of the following code after the webpage finishes loading
$(function () {
  //Stores divs, classes and the current time to be referenced later
  const timeBlock = $('.time-block');
  const currentHour = dayjs().format('H');
  const timeTags = ['#hour-9', '#hour-10', '#hour-11', '#hour-12', '#hour-13', '#hour-14', '#hour-15', '#hour-16', '#hour-17']

  // Listens for when one of the planner divs is clicked and saves the text in the text area to local storage if the save button was clicked
  timeBlock.on('click', function(e) {
    const event = e.target;
    if (event.matches('button')) {
      const hour = $(this).attr('id');
      const textA = $(this).children('.description').val();
      localStorage.setItem(hour, textA);
    }
  })

  // Iterates through the timeTags array and compares the number hour to the current time to determine if the past. present or future class should be added to the corresponding div  
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

  // Retrieves data from local storage and puts it into the planner
  for (x=0; x<timeTags.length; x++) {
    const local = localStorage.key(x);
    const plannerText = localStorage.getItem(local);
    $(timeTags[x]).children('.description').val(plannerText);
  }

  // Displays the current date and day of the week in the header
  $('#currentDay').text(dayjs().format('dddd, MMM D'));
});
