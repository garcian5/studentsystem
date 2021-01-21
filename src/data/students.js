const students = [
  {
    id: '1',
    lastname: 'Empanso', 
    firstname: 'Jessa Lee', 
    middlename: 'L.',
    age: 21,
    dob: new Date(1999, 7, 23), // subtract actual month by 1 to get accurate date
    address: 'Cordova Lapu-Lapu City',
    contact: '098765432100',
    course: 'Bachelor of Science Major in Aviation Information System',
    yearsection: '3rd Year - Alpha',
    // this section will be references to different tables that this has a relationship with
    subject_schedule_id: 'default_sched_97438'
  },
  {
    id: '2',
    lastname: 'Lore', 
    firstname: 'Christy Jane', 
    middlename: 'U.',
    age: 21,
    dob: new Date(1999, 9, 11), // subtract actual month by 1 to get accurate date
    address: 'Bangkal Lapu-Lapu City',
    contact: '098765432100',
    course: 'Bachelor of Science Major in Aviation Information System',
    yearsection: '3rd Year - Alpha',
    // this section will be references to different tables that this has a relationship with
    subject_schedule_id: 'default_sched_97438'
  },
  {
    id: '3',
    lastname: 'Perez', 
    firstname: 'Myka Vallery', 
    middlename: 'M.',
    age: 21,
    dob: new Date(1999, 7, 18), // subtract actual month by 1 to get accurate date
    address: 'Cebu City',
    contact: '098765432100',
    course: 'Bachelor of Science Major in Aviation Information System',
    yearsection: '3rd Year - Alpha',
    // this section will be references to different tables that this has a relationship with
    subject_schedule_id: 'default_sched_97438'
  }
]

export default students;
// Date: https://stackoverflow.com/questions/6471441/setdate-set-the-wrong-date-on-31st