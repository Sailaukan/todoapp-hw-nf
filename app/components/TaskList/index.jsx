import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = (props) => {

  let filteredArray;

  if (props.filter === 1) {
    filteredArray = props.tasks;
  } else if (props.filter === 2) {
    filteredArray = props.tasks.filter(task => !task.completed);
  } else if (props.filter === 3) {
    filteredArray = props.tasks.filter(task => task.completed);
  }


  return (
    <div>
      {filteredArray.map(task => (
        <>
          <TaskItem
            key={task.id}
            text={task.text}
            id={task.id}
            completed={task.completed}
            removeTask={props.removeTask}
            handleChecked={props.handleChecked}
          />
        </>
      ))}
    </div>
  );
};

export default TaskList;
