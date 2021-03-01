type Args = {
    title: string;
    tags: string;
    cloudName: string;
    imagePublicId: string;
};
export default function getOgImage({
    title,
    tags,
    cloudName,
    imagePublicId,
}: Args): string {
    const imageConfig = [
        "w_1280",
        "h_669",
        "c_fill", // fill to given dimensions (crop parameter)
        "q_auto", // default quality
        "f_auto", // automatic format seleection
    ].join(",");

    const titleConfig = [
        "w_760", //text area width, wrap the text
        "c_fit", //crop setting to fit the content to the width
        "co_rgb:FFFFFF",
        "g_south_west", //set "gravity" of the text. Anchor to bottom left of image
        "x_480", // position the text in X px
        "y_254", // move the text in Y px
        `l_text:futura_64:${encodeURIComponent(title)}`, // tells cloudinary that we will add a text overlay with font "futura" size 64 ad content ${title}
    ].join(",");

    const tagsConfig = [
        "w_760", //text area width, wrap the text
        "c_fit", //crop setting to fit the content to the width
        "co_rgb:FFFFFF",
        "g_north_west", //set "gravity" of the text. Anchor to top left of image
        "x_480", // position the text in X px
        "y_445", // move the text in Y px
        `l_text:futura_32:${encodeURIComponent(tags)}`, // tells cloudinary that we will add a text overlay with font "futura" size 64 ad content ${title}
    ].join(",");

    const url = [
        "https://res.cloudinary.com",
        cloudName,
        "image",
        "upload",
        imageConfig,
        titleConfig,
        tagsConfig,
        imagePublicId,
    ];
    return url.join("/");
}
