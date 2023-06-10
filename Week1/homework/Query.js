const tables = ["Invitee", "Room", "Meeting"];

const fieldsTypes = [
  "invitee_no INTEGER, invitee_name TEXT, invited_by TEXT",
  "room_no INTEGER, room_name TEXT, floor_number INTEGER",
  "meeting_no INTEGER, meeting_title TEXT, starting_time TIME, ending_time TIME",
];

const fields = [
  "invitee_no, invitee_name, invited_by",
  "room_no, room_name, floor_number",
  "meeting_no, meeting_title, starting_time, ending_time",
];

const values = [
  [
    " '1', 'crazyPerson', 'crazyCompany' ",
    " '2', 'anotherCrazyPerson', 'sameCrazyCompany' ",
    " '3' , 'yetAnotherCrazyPerson', 'exactCrazyCompany' ",
    " '4', 'plusCrazyPerson', 'theSameCompany'",
    " '5', 'finalCrazyPerson', 'thatCrazyCompany' ",
  ],
  [
    " '1', 'crazyRoom', '2' ",
    " '2', 'sameCrazyRoom', '3' ",
    " '3', 'biggerCrazyRoom', '4' ",
    " '4', 'anotherCrazyRoom', '5' ",
    " '5', 'darkCrazyRoom', '6' ",
  ],
  [
    " '1', 'crazyFastMeeting', '10:5:2', '10:5:3' ",
    " '2', 'AnotherCrazyFastMeeting', '10:5:2', '10:5:3' ",
    " '3', 'AnotherCrazyFastMeeting', '10:5:2', '10:5:3' ",
    " '4', 'AnotherCrazyFastMeeting', '10:5:2', '10:5:3' ",
    " '5', 'AnotherCrazyFastMeeting', '10:5:2', '10:5:3'",
  ],
];

module.exports = { tables, fields, fieldsTypes, values };
