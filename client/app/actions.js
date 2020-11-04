const handlers = {

  saveCourse: async (courseName) => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      const exists = data.find((data) => data.name === courseName);
      if (exists) {
        alert(
          `The course "${courseName}" already exists.`
        );
        return;
      };
      if(courseName.length < 3){
        alert(
          'The course name should be at least 3 characters'
        );
        return;
      }
      const resPost = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify({
          name: courseName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const newRes = await fetch("/api/courses");
      const newData = await newRes.json();

      renderFilesList(newData);
      alert("New course is  saved");
    } catch (error) {
      console.log(error);
    }
  },

  deleteCourse: async (course) => {
    debugger;
    try {
        await fetch("/api/courses/" + course.id, {
        method: "DELETE",
      });
      const res = await fetch("/api/courses");
      const data = await res.json();
      renderFilesList(data);
      alert("file is deleted");
    } catch (error) {
      console.log(error);
    }
  },


  modifyCourse: async (course) => {
    try {
      const newCourseName=prompt("Please, enter the new course name.")
      if (newCourseName.length <3) {
        alert("Course name cannot be less than 3 characters!");
        return;
      }
      const res = await fetch("/api/courses");
      const data = await res.json();
      const exists = data.find((data) => data.name === newCourseName);
      if (exists) {
        alert(
          `The course "${newCourseName}" already exists.`
        );
        return;
      }
      const resPut = await fetch("/api/courses/" + course.id, {
        method: "PUT",
        body: JSON.stringify({
          name: newCourseName
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const resNew = await fetch("/api/courses");
      const dataNew = await resNew.json();
      renderFilesList(dataNew);

      alert("changes saved");
    } catch (error) {
      console.log(error);
    }
  },
};