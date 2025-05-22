import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card, { CardTitle } from "../components/common/Card";
import Modal from "../components/common/Modal";
import CustomCheckbox from "../components/common/Checkbox";
import PieChart from "../components/common/PieChart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../components/specific/Header";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f7f8fa;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column; /* Stack on mobile */
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: calc(100vh - 4.5rem - 0.75rem);
  max-width: 960px;
  margin: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: center; /* Center vertically */
    justify-content: ${(props) => (props.empty ? "center" : "flex-start")};
    padding: 0 20px;
  }
`;

const EmptyStateCard = styled(Card)`
  overflow: hidden;
  text-align: center;
  width: 100%;
  height: 158px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 304px;
  }
`;

const EmptyStateTitle = styled(CardTitle)`
  /* margin-bottom: 1.25rem; */
`;

const EmptyStateButton = styled(Button)`
  /* width: 100%; */
`;

const InfoCardsContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const HighlightedCount = styled.span`
  color: #5285ec;
  font-size: 4rem;
  line-height: 78px;
  vertical-align: bottom;
`;

const TotalCount = styled.span`
  color: #8f9ea2;
  font-size: 20px;
  line-height: 24px;
`;

const TaskListItem = styled.li`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: #8f9ea2;
  font-size: 14px;
  line-height: 26px;
  padding-left: 8px;

  &:first-child {
    margin-top: 12px;
  }
`;

const TaskModalTitle = styled.p`
  font-size: 18px;
  color: #537178;
  margin-bottom: 1.5rem;
  text-align: left;
  font-weight: 500;
`;

const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TaskListSection = styled.div`
  width: 100%;
  background: #fff;
  padding: 1rem;
  box-shadow: 0px 3px 6px #00000014;
  margin-bottom: 1rem;
  display: ${(props) => (props.empty ? "none" : "block")};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: 0.75rem;
  }
`;

const TaskItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
`;

const TaskTitle = styled.span`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: #5285ec;
  font-size: 1.25rem;
  line-height: 28px;
  padding-right: 1rem;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: baseline;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SearchSection = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 15px 16px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0 16px;
  }
`;

const SearchSectionTitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #537178;
  text-align: center;
`;

const SearchSectionAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: 12px;

    input {
      width: 100%;
    }

    button {
      width: 100%;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  svg {
    width: 20px;
    height: 20px;
    color: #7a7d7e;
  }
`;

const StyledInput = styled(Input)`
  padding-left: 40px;
  min-width: 244px;

  &::placeholder {
    text-align: center;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &::placeholder {
      text-align: left;
    }
  }
`;

const SearchInput = (props) => (
  <InputWrapper>
    <IconWrapper>
      <img
        src={"/images/icons/icon-search.svg"}
        alt="Search"
        width={16}
        height={16}
      />
    </IconWrapper>
    <StyledInput {...props} />
  </InputWrapper>
);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const completedTasksCount = useMemo(() => {
    const filteredTasks = tasks.filter((task) => task.completed);

    return filteredTasks.length;
  }, [tasks]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate data fetching
      const savedTasks = JSON.parse(sessionStorage.getItem("tasks") || "[]");
      setTasks(savedTasks);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setModalOpen(false);
    setNewTaskTitle("");
  };

  const handleToggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, title: editTaskTitle } : task
    );
    setTasks(updatedTasks);
    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setEditModalOpen(false);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <PageWrapper>
      <Header />

      <PageContent empty={tasks.length === 0 && !isLoading}>
        {!isLoading && tasks.length === 0 ? (
          <EmptyStateCard>
            <EmptyStateTitle>You have no task.</EmptyStateTitle>
            <EmptyStateButton onClick={() => setModalOpen(true)}>
              + New Task
            </EmptyStateButton>
          </EmptyStateCard>
        ) : (
          <>
            <InfoCardsContainer>
              <Card isLoading={isLoading}>
                <CardTitle>Tasks Completed</CardTitle>
                <HighlightedCount>{completedTasksCount}</HighlightedCount>
                <TotalCount>/ {tasks.length}</TotalCount>
              </Card>
              <Card isLoading={isLoading}>
                <CardTitle>Latest Created Tasks</CardTitle>
                <div>
                  {tasks.map((task, index) => {
                    if (index > 2) return null;
                    else
                      return (
                        <TaskListItem completed={task.completed}>
                          {task.title}
                        </TaskListItem>
                      );
                  })}
                </div>
              </Card>
              <Card isLoading={isLoading}>
                <PieChart
                  completed={completedTasksCount}
                  total={tasks.length}
                />
              </Card>
            </InfoCardsContainer>

            <SearchSection>
              <SearchSectionTitle>Tasks</SearchSectionTitle>
              <SearchSectionAction>
                <SearchInput
                  type="text"
                  placeholder="Search by task name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  disabled={isLoading}
                >
                  + New Task
                </Button>
              </SearchSectionAction>
            </SearchSection>
          </>
        )}

        <TaskListSection empty={tasks.length === 0 && !isLoading}>
          {isLoading ? (
            <Skeleton count={5} height={50} style={{ marginBottom: 8 }} />
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id}>
                <TaskInfo>
                  <CustomCheckbox
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
                </TaskInfo>
                <TaskActions>
                  <IconButton
                    onClick={() => {
                      setEditModalOpen(true);
                      setEditTaskTitle(task.title);
                      setEditTaskId(task.id);
                    }}
                    aria-label="Delete"
                    type="button"
                  >
                    <img
                      src={"/images/icons/icon-pen.svg"}
                      alt="Delete"
                      width={18}
                      height={18}
                    />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDeleteTask(task.id)}
                    aria-label="Delete"
                    type="button"
                  >
                    <img
                      src={"/images/icons/icon-trash.svg"}
                      alt="Delete"
                      width={18}
                      height={18}
                    />
                  </IconButton>
                </TaskActions>
              </TaskItem>
            ))
          ) : (
            <p>Sorry, no results found</p>
          )}
        </TaskListSection>
      </PageContent>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <TaskModalTitle>+ New Task</TaskModalTitle>
        <TaskForm onSubmit={handleAddTask}>
          <Input
            type="text"
            placeholder="Task Name"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            required
            autoFocus
          />

          <Button type="submit">+ New Task</Button>
        </TaskForm>
      </Modal>

      <Modal show={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <TaskModalTitle>Edit Task</TaskModalTitle>
        <TaskForm onSubmit={handleEditTask}>
          <Input
            type="text"
            placeholder="Task Name"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            required
            autoFocus
          />

          <Button type="submit">Confirm edit</Button>
        </TaskForm>
      </Modal>
    </PageWrapper>
  );
};

export default Dashboard;
