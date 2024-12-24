import * as React from "react";
import type {Editor} from "@tiptap/react";
import {BubbleMenu} from "@tiptap/react";
import {SectionOne} from "../section/one";
import {SectionTwo} from "../section/two";
import {SectionThree} from "../section/three";
import {SectionFour} from "../section/four";
import {SectionFive} from "../section/five";
import {SectionSix} from "../section/six";
import {Separator} from "@/components/ui/separator";

interface LinkBubbleMenuProps {
    editor: Editor;
}

interface LinkAttributes {
    href: string;
    target: string;
}

export const BubbleMenuFixed: React.FC<LinkBubbleMenuProps> = ({editor}) => {
    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{duration: 100}}
        >
            <div className="bubble-menu bg-background rounded-xl border-2 flex w-fit h-full items-center gap-2 px-4">
                <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]}/>

                <Separator orientation="vertical" className="mx-2 h-7"/>

                <SectionTwo
                    editor={editor}
                    activeActions={[
                        "bold",
                        "italic",
                        "underline",
                        "alignLeft",
                        "alignCenter",
                        "alignRight",
                        "strikethrough",
                        "code",
                        "clearFormatting",
                    ]}
                    mainActionCount={6}
                />

                <Separator orientation="vertical" className="mx-2 h-7"/>

                <SectionThree editor={editor}/>

                <Separator orientation="vertical" className="mx-2 h-7"/>

                <SectionFour
                    editor={editor}
                    activeActions={["orderedList", "bulletList"]}
                    mainActionCount={2}
                />

                <Separator orientation="vertical" className="mx-2 h-7"/>

                <SectionFive
                    editor={editor}
                    activeActions={["codeBlock", "blockquote", "horizontalRule"]}
                    mainActionCount={3}
                />

                <Separator orientation="vertical" className="mx-2 h-7"/>

                <SectionSix editor={editor}/>
            </div>
        </BubbleMenu>
    );
};
