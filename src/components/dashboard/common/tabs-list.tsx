import {TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function TabsListCustom({tabs}: { tabs: { value: string, label: string, className?: string }[] }) {
    return (
        <TabsList>
            {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className={tab.className}>
                    {tab.label}
                </TabsTrigger>
            ))}
        </TabsList>
    );
}
