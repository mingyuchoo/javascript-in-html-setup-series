import { greeting, square } from './main';
import $ from 'jquery';

let i = 2;

$('#greeting').click(() => {
  greeting();
});

const setMessageText = (msg) => {
  $('#message').text(msg);
};

setMessageText('The Square of ' + i + ' is ' + square(i));

$('#calc').click(() => {
  i++;
  setMessageText('The Square of ' + i + ' is ' + square(i));
});
