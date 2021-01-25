// import data
import subjects from '../data/subjects';
import schedule from '../data/schedules';
import subjects_sched from '../data/subject_schedules';
import instructors from '../data/instructors';
import grades from '../data/grades';
import students from '../data/students';

export const getSchedule = (student) => {
  // SCHEDULE
  // get schedule
  const sched = schedule.filter(s => {
    return student[0].subject_schedule_id === s.id
  })      
  // get subject schedule from sched
  const sub_sched = [];
  // iterate through type of schedule that we got from earlier then iterate through the subjects schedules and check if the subject sched id matches and add them onto our array
  for (const subsched_id of sched[0].subject_sched_lst) {
    for (const subsched of subjects_sched) {
      if (subsched_id === subsched.id) {
        sub_sched.push(subsched);
      }
    }
  }
  // get subject name from sub_sched
  const complete_schedule = [];
  let temp_sched = {};
  // iterate through subject schedules to find subject name from subjects table, as well, find the instructors for each subject and store matching ones onto complete schedule
  for (const sub of sub_sched) {
    temp_sched = sub;
    for (const subject of subjects) {
      if (subject.id === sub.subject_id) {
        temp_sched.subject_name = subject.name;
        temp_sched.instructor_id = subject.instructor_id;
      }          
    }
    for (const inst of instructors) {
      if (inst.id === temp_sched.instructor_id) {
        temp_sched.instructor_name = inst.name;
      }
    }
    complete_schedule.push(temp_sched);
  }
  return complete_schedule;
}

export const getGrades = (student) => {
  // GRADES
  const grades_lst = [];
  let temp_grade_info = {};
  for (const subject of subjects) {
    for (const grade of grades) {
      if (student[0].id === grade.student_id && subject.id === grade.subject_id) {
        temp_grade_info = grade;
        temp_grade_info.subject_name = subject.name;
      }
    }
    // if there is no grade for the student in this iteration, skip it (don't) push onto the list
    if (Object.keys(temp_grade_info).length === 0) continue;
    grades_lst.push(temp_grade_info);
  }
  return grades_lst;
}

export const getSubjects = () => {
  return subjects;
}

export const getSubject_Schedules = () => {
  return subjects_sched;
}

export const getStudents = () => {
  return students;
}

// for register
export const getNewRegisteredSched = (list_scheds) => {
  const newSched = [];
  // go through the list of subject_schedules
  for (const subsched_id of list_scheds) {
    for (const subsched of subjects_sched) {
      if (subsched_id === subsched.id) {
        newSched.push(subsched);
      }
    }
  }

  // get subject name from newSched
  const complete_schedule = [];
  let temp_sched = {};
  // iterate through subject schedules to find subject name from subjects table, as well, find the instructors for each subject and store matching ones onto complete schedule
  for (const sub of newSched) {
    temp_sched = sub;
    for (const subject of subjects) {
      if (subject.id === sub.subject_id) {
        temp_sched.subject_name = subject.name;
        temp_sched.instructor_id = subject.instructor_id;
      }          
    }
    for (const inst of instructors) {
      if (inst.id === temp_sched.instructor_id) {
        temp_sched.instructor_name = inst.name;
      }
    }
    complete_schedule.push(temp_sched);
  }
  return complete_schedule;
}

export const getRestoredSubject = (sched_id) => {
  let sub_id_tocompare = '';
  for (const subsched of subjects_sched) {
    if (sched_id === subsched.id) {
      sub_id_tocompare = subsched.subject_id;
    }
  }
  let restoredSub = {}
  for (const sub of subjects) { 
    if (sub.id === sub_id_tocompare) {
      restoredSub = sub;
    }
  }
  return restoredSub;
}

export const getRestoredSched = (sched_id) => {
  let restoredSched = {};
  for (const subsched of subjects_sched) {
    if (sched_id === subsched.id) {
      restoredSched = subsched;
    }
  }
  
  return restoredSched;
}