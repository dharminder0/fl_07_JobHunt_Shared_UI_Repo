export default function NoDataAvailable({ text = "No Data Available" }) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-140px)]">
      <p className="text-heading">{text}</p>
    </div>
  );
}
