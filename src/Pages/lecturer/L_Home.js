import React, { useContext } from "react";
import L_Layout from "../../Layouts/L_Layout";
import GlobalContext from "../../context/GlobalContext";
import CreateSlot from "../../components/Schedule/CreateSlot";
const L_home = () => {

  const { showSlotModal } = useContext(GlobalContext)
  return (
    <>
      {showSlotModal && <CreateSlot />}
      <L_Layout>
        <L_home />
      </L_Layout>
    </>
  );
};

export default L_home;
