import { cn } from "@/lib/utils";
import { ChevronsLeftIcon, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type Props = {};

const Navigation = (props: Props) => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const documents = useQuery(api.documents.get);
  const isResizing = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathName, isMobile]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) {
      newWidth = 240;
    }

    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : `calc(100% - 240px)`
      );

      navBarRef.current.style.setProperty("left", isMobile ? "0" : `240px`);
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sideBarRef.current.style.width = "0px";
      navBarRef.current.style.setProperty("width", "100%");
      navBarRef.current.style.setProperty("left", "0px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "relative group/sidebar h-full bg-secondary overflow-y-auto flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          className={cn(
            "h-6 w-6 rounded-sm text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 top-3 right-2 opacity-0 absolute group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          role="button"
        >
          <ChevronsLeftIcon className="h-6 w-6" />
        </div>
        <div>
          <UserItem></UserItem>
        </div>
        <div className="mt-4">
          <p>
            {documents?.map((document) => (
              <p key={document._id}>{document.title}</p>
            ))}
          </p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100
        transition
        cursor-ew-resize
        absolute
        h-full w-1
        bg-primary/10
        top-10 right-0 "
        />
      </aside>
      {/* For handling the collapsing and width of the sidebar as it is draggable, 
      we need the below conditions and classes */}
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <Menu
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground "
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
