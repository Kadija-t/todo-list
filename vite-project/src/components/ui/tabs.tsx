// import React, { ReactNode } from "react";

// interface TabsProps {
//   value: string;
//   onValueChange: (value: string) => void;
//   children: ReactNode;
// }

// export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children }) => {
//   return (
//     <div className="tabs">
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, {
//             active: child.props.value === value,
//             onClick: () => onValueChange(child.props.value),
//           });
//         }
//         return child;
//       })}
//     </div>
//   );
// };

// interface TabsListProps {
//   children: ReactNode;
// }

// export const TabsList: React.FC<TabsListProps> = ({ children }) => {
//   return <div className="tabs-list">{children}</div>;
// };

// interface TabsTriggerProps {
//   value: string;
//   active?: boolean;
//   onClick: () => void;
//   children: ReactNode;
// }

// export const TabsTrigger: React.FC<TabsTriggerProps> = ({
//   value,
//   active,
//   onClick,
//   children,
// }) => {
//   return (
//     <button
//       className={`tabs-trigger ${active ? "active" : ""}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// interface TabsContentProps {
//   value: string;
//   children: ReactNode;
// }

// export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
//   return <div className={`tabs-content ${value}`}>{children}</div>;
// };





// import React, { ReactNode, FC } from "react";

// interface TabsProps {
//   value: string;
//   onValueChange: (value: string) => void;
//   children: ReactNode;
// }

// export const Tabs: FC<TabsProps> = ({ value, onValueChange, children }) => {
//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, {
//             activeTab: value,
//             onValueChange: onValueChange,
//           });
//         }
//         return child;
//       })}
//     </div>
//   );
// };

// interface TabsListProps {
//   children: ReactNode;
// }

// export const TabsList: FC<TabsListProps> = ({ children }) => (
//   <div className="flex">{children}</div>
// );

// interface TabsTriggerProps {
//   value: string;
//   activeTab?: string;
//   onValueChange?: (value: string) => void;
//   children: ReactNode;
// }

// export const TabsTrigger: FC<TabsTriggerProps> = ({
//   value,
//   activeTab,
//   onValueChange,
//   children,
// }) => {
//   const isActive = activeTab === value;
//   return (
//     <button
//       onClick={() => onValueChange && onValueChange(value)}
//       className={`px-4 py-2 rounded ${
//         isActive ? "bg-emerald-500 text-white" : "bg-emerald-100"
//       }`}
//     >
//       {children}
//     </button>
//   );
// };


import React, { ReactNode, FC } from "react";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const Tabs: FC<TabsProps> = ({ value, onValueChange, children }) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            activeTab: value,
            onValueChange: onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsListProps {
  children: ReactNode;
}

export const TabsList: FC<TabsListProps> = ({ children }) => (
  <div className="flex">{children}</div>
);

interface TabsTriggerProps {
  value: string;
  activeTab?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export const TabsTrigger: FC<TabsTriggerProps> = ({
  value,
  activeTab,
  onValueChange,
  children,
}) => {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => onValueChange && onValueChange(value)}
      className={`px-4 py-2 rounded ${isActive ? "bg-emerald-500 text-white" : "bg-emerald-100"}`}
    >
      {children}
    </button>
  );
};
