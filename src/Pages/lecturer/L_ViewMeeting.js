import React, { useContext, useEffect } from "react";
import L_Layout from "../../Layouts/L_Layout";
import Calender_type from "../../components/Calender_type";
import Breadcrumbs from "../../components/BreadcrumpCus";
import GlobalContext from "../../context/GlobalContext";
import CreateSlot from "../../components/Schedule/CreateSlot";


const path = [
    {
        route: '/lecturer',
        text: 'Home',
    },
    {
        route: '/lecturer/meetingschedule',
        text: 'View Meeting Schedule',
    },
]
const L_ViewMeeting = () => {

    const { showSlotModal } = useContext(GlobalContext)

    return (
        <L_Layout>
            {showSlotModal && <CreateSlot />}
            <Breadcrumbs items={path} />
            <Calender_type />
        </L_Layout>
    );
};

export default L_ViewMeeting;