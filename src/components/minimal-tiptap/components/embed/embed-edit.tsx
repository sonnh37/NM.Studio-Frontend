import * as React from "react";
import type {Editor} from "@tiptap/react";
import ToolbarButton from "../toolbar-button";
import {VariantProps} from "class-variance-authority";
import {toggleVariants} from "@/components/ui/toggle";
import {TfiYoutube} from "react-icons/tfi";

interface EmbedEditProps extends VariantProps<typeof toggleVariants> {
    editor: Editor;
}

export const EmbedEdit: React.FC<EmbedEditProps> = ({
                                                        editor,
                                                        size,
                                                        variant,
                                                    }: EmbedEditProps) => {
    const [height, setHeight] = React.useState(480);
    const [width, setWidth] = React.useState(640);

    const addYoutubeVideo = () => {
        let width_;
        let height_;

        // Yêu cầu người dùng nhập width cho đến khi hợp lệ
        while (!width_ || isNaN(parseInt(width_)) || parseInt(width_) < 320) {
            width_ = prompt(
                `Enter Width (Min: 320, Default Width: ${width})`,
                width.toString()
            );
            if (width_ === null) return;
            if (!width_) {
                alert("Width is required. Please enter a valid value.");
            } else if (isNaN(parseInt(width_)) || parseInt(width_) < 320) {
                alert("Width must be a number and at least 320.");
            }
        }

        // Yêu cầu người dùng nhập height cho đến khi hợp lệ
        while (!height_ || isNaN(parseInt(height_)) || parseInt(height_) < 180) {
            height_ = prompt(
                `Enter Height (Min: 180, Default Height: ${height})`,
                height.toString()
            );
            if (height_ === null) return;
            if (!height_) {
                alert("Height is required. Please enter a valid value.");
            } else if (isNaN(parseInt(height_)) || parseInt(height_) < 180) {
                alert("Height must be a number and at least 180.");
            }
        }

        // Hiển thị prompt cho YouTube URL
        const url = prompt("Enter YouTube URL");
        if (url == null) {
            return;
        }
        // Kiểm tra nếu URL hợp lệ
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: parseInt(width_),
                height: parseInt(height_),
            });
        } else {
            alert("YouTube URL is empty.");
        }
    };

    return (
        <div className="flex flex-row justify-center gap-1 text-center items-center">
            <ToolbarButton
                // isActive={editor.isActive('link')}
                tooltip="Link"
                aria-label="Insert link"
                // disabled={editor.isActive('codeBlock')}
                size={size}
                onClick={addYoutubeVideo}
                variant={variant}
            >
                <TfiYoutube className="size-5"/>
            </ToolbarButton>
        </div>
    );
};

export default EmbedEdit;
