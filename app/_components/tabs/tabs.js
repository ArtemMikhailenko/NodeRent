import "./styles.css";
import * as TabsPrimitiv from "@radix-ui/react-tabs";

export const Tabs = ({ data }) => {
  return (
    <TabsPrimitiv.Root defaultValue={data[0].header}>
      <TabsPrimitiv.List className="flex gap-4 bg-midnight-900 mt-5 rounded-tl-lg rounded-tr-lg px-5 overflow-hidden">
        {data.map((item) => (
          <TabsPrimitiv.Trigger
            className="trigger font-semibold relative h-full py-3 data-[state=active]:text-blue-400 data-[state=active]:hover:text-blue-300 after:bg-blue-500 data-[state=active]:after:shadow-blue-500 data-[state=active]:after:shadow-[0px_0px_3px]"
            value={item.header}
            key={item.header}
          >
            {item.icon}
            {item.header}
          </TabsPrimitiv.Trigger>
        ))}
      </TabsPrimitiv.List>
      {data.map((item) => (
        <TabsPrimitiv.Content
          className="bg-midnight-800 p-4 rounded-br-lg rounded-bl-lg"
          value={item.header}
          key={`${item.header}_content`}
        >
          {item.content}
        </TabsPrimitiv.Content>
      ))}
    </TabsPrimitiv.Root>
  );
};
