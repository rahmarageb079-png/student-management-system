class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }
  calculateAverage() {
    return this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length;
  }
  getGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }
  getFinalResult(average) {
    if (average >= 50 && this.attendance >= 75) return "Passed";
    return "Needs Review";
  }
}
const studentsList = [
  new Student("STU-2026-101", "Youssef El-Sayed", [88, 92, 85], 92),
  new Student("STU-2026-102", "Mariam Khaled", [45, 42, 48], 80),
  new Student("STU-2026-103", "Omar Farouk", [38, 44, 41], 68),
  new Student("STU-2026-104", "Laila Hassan", [72, 68, 75], 88),
];
console.log("--- All Students ---");
studentsList.forEach((s) => {
  const avg = s.calculateAverage();
  console.log(`ID: ${s.id} | Name: ${s.name} | Grades: [${s.grades.join(", ")}] | Attendance: ${s.attendance}% | Avg: ${avg.toFixed(2)} | Grade: ${s.getGrade(avg)} | Result: ${s.getFinalResult(avg)}`);
});
const strugglingStudents = studentsList.filter((s) => {
  const avg = s.calculateAverage();
  return avg >= 40 && avg <= 49;
});
const strugglingWithGrace = strugglingStudents.map((s) => {
  const originalAverage = s.calculateAverage();
  const newAverage = Math.min(originalAverage + 5, 100);
  return { student: s, originalAverage, newAverage, newLetterGrade: s.getGrade(newAverage), newFinalResult: s.getFinalResult(newAverage) };
});
const sumOfNewAverages = strugglingWithGrace.reduce((sum, item) => sum + item.newAverage, 0);
const averageAfterGrace = strugglingWithGrace.length > 0 ? sumOfNewAverages / strugglingWithGrace.length : 0;
console.log("--- Grace Marks ---");
console.table(strugglingWithGrace.map((item) => ({
  ID: item.student.id,
  Name: item.student.name,
  OriginalAverage: Number(item.originalAverage.toFixed(2)),
  NewAverage: Number(item.newAverage.toFixed(2)),
  UpdatedGrade: item.newLetterGrade,
  UpdatedResult: item.newFinalResult,
})));
console.log("Sum of New Averages:", sumOfNewAverages.toFixed(2));
console.log("Average After Grace:", averageAfterGrace.toFixed(2));
