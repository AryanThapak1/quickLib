import MiniProfile from "../utils/MiniProfile";
import image from "./../Items/account.png";
export default function Profile() {
  const headers = ["Full Name", "Role", "Branch", "Session", "Email"];
  const data = {
    fullname: "Aryan Thapak",
    role: "Student",
    branch: "CSE",
    session: "2020-2024",
    email: "aryanthapak.8@gmail.com",
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
      <div className="w-full md:w-[160px] mx-auto">
        <img src={image} className="mx-auto" alt="Profile" />
      </div>
      <div>
        <input type="file" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {headers.map((el) => (
            <MiniProfile
              title={el}
              text={data[el.split(" ").join().toLowerCase()]}
            />
          ))}
        </dl>
      </div>
    </div>
  );
}
