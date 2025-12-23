import { Search } from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../hoc/WindowWrapper";
import {
  locations,
  type FileSystemItem,
  type LocationData,
} from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import useWindowStore from "../store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item: FileSystemItem) => {
    if (item.fileType && item.fileType === "pdf") return openWindow("resume");
    if (item.kind && item.kind === "folder") return setActiveLocation(item);
    if (item.fileType && ["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
  };

  const renderList = (
    items: LocationData[] | FileSystemItem[],
    name: string
  ) => (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
        {name}
      </h3>
      <ul className="px-2">
        {items.map((item: LocationData | FileSystemItem) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors",
              item.id === activeLocation.id
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700"
            )}
          >
            <img
              src={item.icon}
              className="w-4 h-4 cursor-pointer"
              alt={item.name}
            />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList(Object.values(locations), "Favourite")}
          {renderList(locations.work.children, "My Projects")}
        </div>
        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
