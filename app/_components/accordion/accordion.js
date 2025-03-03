import * as AccordionPrimitive from "@radix-ui/react-accordion";

export const Accordion = ({ data }) => {
  return (
    <AccordionPrimitive.Root type="single" className="space-y-1 w-full">
      {data.map(({ header, content }, i) => (
        <AccordionPrimitive.Item
          key={`accordion-header-${header}`}
          value={`item-${i + 1}`}
          className="rounded-lg focus-within:ring-3 focus-within:ring-purple-500 focus-within:ring-opacity-75 focus:outline-hidden w-full"
        >
          <AccordionPrimitive.Header className="w-full">
            <AccordionPrimitive.Trigger className="group radix-state-open:rounded-t-lg radix-state-closed:rounded-lg focus:outline-hidden inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {header}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                className="ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400 group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
            <div className="text-sm text-gray-700 dark:text-gray-400">
              {content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
};
