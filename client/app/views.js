const renderFilesList = (filesArr) => {

  const filesList = filesArr
    .map(course => {
      const courseElement = document.createElement('p');
      courseElement.innerHTML = course.name;
      courseElement.id = course.id;

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
      deleteButton.className = "destroy";
      deleteButton.style.float="right";
      //deleteButton.innerHTML = 'X';
      deleteButton.onclick = () => handlers.deleteCourse(course);
      courseElement.appendChild(deleteButton);


     const editButton = document.createElement('button');
     editButton.innerHTML = '<i class="fas fa-pen"></i>';
     editButton.className = "destroy";
     editButton.style.float="right";
     editButton.onclick = () => handlers.modifyCourse(course);
     courseElement.appendChild(editButton);

      const li = document.createElement('li');
      li.appendChild(courseElement);
      return li;
    })
    .reduce((all, next) => {
      all.appendChild(next);
      return all;
    }, document.createElement('ul'));

  const filesListContainer = document.getElementById('courses-list-container');
  filesListContainer.innerHTML = '';
  filesListContainer.appendChild(filesList);
};


