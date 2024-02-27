import MiniProfile from "../utils/MiniProfile";
import image from "./../Items/account.png";

export default function Profile() {
  const headers = [
    "Full Name",
    "Role",
    "Branch",
    "Session",
    "Email",
    "Enrollment No",
  ];
  const data = {
    fullname: "Aryan Thapak",
    role: "Student",
    branch: "CSE",
    session: "2020-2024",
    email: "aryanthapak.8@gmail.com",
    enrollmentno: "0827CS210046",
  };

  const token = sessionStorage.getItem("token");
  const fetchData = async () => {
    const response = await fetch("", {
      method: "GET",
      headers: {
        Authentication: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="mx-[10%] my-[5%]">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Student Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details
        </p>
      </div>
      <div className="w-full md:w-[10%] mx-auto">
        <img src={image} className="mx-auto max-w-full h-auto" alt="Profile" />
      </div>
      <div>
        <input type="file" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {headers.map((el) => (
            <MiniProfile
              key={el}
              title={el}
              text={data[el.split(" ").join("").toLowerCase()]}
            />
          ))}
        </dl>
      </div>
    </div>
  );
}
