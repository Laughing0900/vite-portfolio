import Title from "@/components/home/talent/cards/Title";
import { Compare } from "@/components/ui/aceternity/compile";
import { memo } from "react";

const betterCode = `const UserProfile = ({ user, onUpdate, isLoading }) => {
  if (isLoading) return <Spinner size="medium" />;
  
  if (!user) return <EmptyState message="User not found" />;
  
  const handleSubmit = (values) => {
    onUpdate(values)
      .then(() => toast.success('Profile updated'))
      .catch((error) => toast.error(error.message));
  };

  return (
    <Card>
      <ProfileHeader name={user.name} role={user.role} />
      <ProfileForm 
        initialValues={user} 
        onSubmit={handleSubmit} 
        isSubmitting={isLoading} 
      />
    </Card>
  );
};`;
const worseCode = `function UserProfile(props) {
  var userData = props.userData;
  
  if (props.loading == true) {
    return <div className="spinner">Loading...</div>
  }
  
  function submitHandler() {
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    props.userData.name = name;
    props.userData.email = email;
    props.update(props.userData);
    alert('Updated!');
  }
  
  return (
    <div style={{border: '1px solid black', padding: '20px'}}>
      <h2>{userData && userData.name ? userData.name : 'No Name'}</h2>
      <div>
        Name: <input id="nameInput" defaultValue={userData?.name} />
        Email: <input id="emailInput" defaultValue={userData?.email} />
        <button onClick={submitHandler}>Save Changes</button>
      </div>
    </div>
  )
}`;

const Schedule = memo(() => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-4 overflow-hidden pb-5 lg:items-center">
      <Title
        title="Maintainable"
        description="Built with a clear and organized programme structure."
      />

      <Compare
        firstCode={betterCode}
        secondCode={worseCode}
        className="aspect-square w-[110%]"
        slideMode="drag"
      />
    </div>
  );
});

export default Schedule;
