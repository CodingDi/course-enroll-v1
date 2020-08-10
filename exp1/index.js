function onLoadCourses() {
  //console.log('Button clicked!');
  //AJAX
  //1.发送XHR获取数据
  //2.根据收到的response操作DOM tree展示数据
  const xhr = new XMLHttpRequest();
  //call back
  //状态变后会执行该函数，触发条件是readyStatec changed
  xhr.onreadystatechange = myHandler; //把function referecen pass to it, instead of call
  //true->异步  false->同步
  xhr.open(
    'get',
    'https://bba2652e-da95-4d56-9a93-28de4c427108.mock.pstmn.io/courses',
    true
  );
  xhr.send(null);
  console.log('Received message');
}
//axios 包装HTR
function myHandler() {
  //console.log(this.readySyaye+"Handler Call");
  //myHandle 一共会被call 4次
  //expect:所有run完后 processes consol.log
  if (this.readyState === 4 && this.status === 200) {
    //present data
    //JSON-> Javascript Object Notation
    const responseObject = JSON.parse(this.responseText);
    console.log(responseObject);
    //1.log 2. debugger  -> debug
    //把JS object 转化成HTML 操作DOM tree展示在页面
    renderData(responseObject);
  }
}

function renderData(responseObject) {
  //斜引号更powerful
  let html = `
        <table>
            <tr>
                <th>Course Name</th>
                <th>Course Location</th>
                <th>Course Content</th>
                <th>Teacher ID</th>
            <tr> 
    `;
  //转化responseObject => html rows
  //mappingng ->course object 转化成一个html row
  //只需要给html1个string,所以需要返还
  html += responseObject
    .map(courseObject => {
      let row = '<tr>';
      row += `<td>${courseObject.courseName}</td>`;
      row += `<td>${courseObject.courseLocation}</td>`;
      row += `<td>${courseObject.courseContent}</td>`;
      row += `<td>${courseObject.teacherId}</td>`;
      row += '</tr>';
      return row;
    })
    .reduce((row1, row2) => row1 + row2);
  html += '</table>';
  document.getElementById('course').innerHTML = html;
}
