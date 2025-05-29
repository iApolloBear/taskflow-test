import Tasks from "../Tasks"
import UserSidebar from "./UserSidebar"

const UserTasks = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <div className="flex-1 p-6">
        <Tasks />
      </div>
    </div>
  )
}


export default UserTasks
