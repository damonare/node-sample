function route(handle, pathname, response, request) {
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        // 发送 HTTP 头部
	    // HTTP 状态值: 404 : Not found
	    // 内容类型: text/plain
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;
