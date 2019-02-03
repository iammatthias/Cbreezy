import MdBusiness from "react-icons/lib/md/business";

export default {
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  liveEdit: false,
  icon: MdBusiness,
  fields: [
    {
      name: "name",
      title: "Company name",
      type: "string"
    },
    {
      name: "email",
      title: "Email",
      type: "email"
    },
    {
      name: "city",
      title: "City",
      type: "string"
    },
    {
      name: "country",
      title: "Country",
      type: "string"
    }
  ]
};
