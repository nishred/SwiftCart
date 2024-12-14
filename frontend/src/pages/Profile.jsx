import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import UpdateProfile from "../components/UpdateProfile";

const StyledProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-height: 100%;
  column-gap: 2rem;
`;

const StyledProfile = styled.div`
  grid-column: 1/2;
`;

const StyledOrders = styled.div`
  grid-column: 2/5;
`;

const Profile = () => {
  const user = useSelector((store) => store.user);

  const [showForm, setShowForm] = useState(false);

  return (
    <StyledProfileContainer>
      <StyledProfile>
        {!showForm && (
          <>
            <h1 className="text-3xl font-bold uppercase text-slate-600">
              User Profile
            </h1>

            <div className="flex flex-col gap-4 text-slate-600 mt-8">
              <div className="flex justify-between py-2 bg-slate-100 px-2 rounded-lg">
                <div>Name</div>
                <div className="font-semibold">{user.name}</div>
              </div>
              <div className="flex justify-between py-2 bg-slate-100 px-2 rounded-lg">
                <div>Email</div>

                <div className="font-semibold">{user.email}</div>
              </div>

              <div className="flex">
                <button
                  onClick={() => {
                    setShowForm(true);
                  }}
                  className="px-4 py-2 bg-slate-500 rounded-lg text-slate-200 font-semibold ml-auto"
                >
                  Update
                </button>
              </div>
            </div>
          </>
        )}
        {showForm && <UpdateProfile setShowForm={setShowForm} />}
      </StyledProfile>

      <StyledOrders>
        <h1 className="text-3xl font-bold uppercase text-slate-600">
          My orders
        </h1>
      </StyledOrders>
    </StyledProfileContainer>
  );
};

export default Profile;
