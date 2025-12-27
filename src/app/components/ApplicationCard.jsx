const ApplicationCard = ({ company, title, statusText,detailText, children }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border space-y-3 ">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{company}</h3>
        <p className="text-sm text-gray-700">{title}</p>
        <p className="text-xs text-gray-600">{statusText}</p>
        {detailText?<p className="text-xs text-gray-500">{detailText}</p>:null}
      </div>

      {children}
    </div>
  );
};
export default ApplicationCard;