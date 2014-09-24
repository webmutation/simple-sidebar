function updatefollowers(nfollowers){
    document.getElementById("numberfollowers").innerHTML = nfollowers;
}

function decorateUserNode(){
    //Find node zero
    //Change CSS attribs

}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function main () {
    // Step 1. We create a graph object.
    var graph = Viva.Graph.graph();
    var nNode = 2;

    graph.addNode(0, '4113b5174d15f291d0183243969cc6d1');
    graph.addNode(1, '91bad8ceeec43ae303790f8fe238164b');
    graph.addLink(0, 1);

    updatefollowers(1);



    var graphics = Viva.Graph.View.svgGraphics(),
        nodeSize = 24,
    // we use this method to highlight all realted links
    // when user hovers mouse over a node:
        highlightRelatedNodes = function(nodeId, isOn) {
            // just enumerate all realted nodes and update link color:
            graph.forEachLinkedNode(nodeId, function(node, link){
                var linkUI = graphics.getLinkUI(link.id);
                if (linkUI) {
                    // linkUI is a UI object created by graphics below
                    linkUI.attr('stroke', isOn ? 'red' : 'green');
                }
            });
        };

    // Since we are using SVG we can easily subscribe to any supported
    // events (http://www.w3.org/TR/SVG/interact.html#SVGEvents ),
    // including mouse events:
    graphics.node(function(node) {
        var ui = Viva.Graph.svg('image')
            .attr('width', nodeSize)
            .attr('height', nodeSize)
            .link('https://secure.gravatar.com/avatar/' + node.data);

        $(ui).hover(function() { // mouse over
            highlightRelatedNodes(node.id, true);
        }, function() { // mouse out
            highlightRelatedNodes(node.id, false);
        });
        return ui;
    }).placeNode(function(nodeUI, pos) {
        nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y - nodeSize / 2);
    });

    graphics.link(function(link){
        return Viva.Graph.svg('path')
            .attr('stroke', 'green')
            .attr('stroke-width', '3');
    }).placeLink(function(linkUI, fromPos, toPos) {
        var data = 'M' + fromPos.x + ',' + fromPos.y +
            'L' + toPos.x + ',' + toPos.y;

        linkUI.attr("d", data);
    })

    var renderer = Viva.Graph.View.renderer(graph,
        {
            graphics : graphics,
            container: document.getElementById("visualization")
        });

    renderer.run();

    setInterval(function(){
        if(nNode <= 150){
            graph.addNode(nNode);
            //randomIntFromInterval(0,nNode-1)
            graph.addLink(randomIntFromInterval(0,nNode-1),nNode);

            renderer.run();
            updatefollowers(nNode);
            nNode++;
        }
        },2000);

    // Step 3. Render the graph.

}