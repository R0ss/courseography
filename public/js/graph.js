requirejs([
    'es6!graph/react_graph',
    'es6!graph/sidebar/sidebar_divs',
    'es6!graph/sidebar/focus_descriptions'],
    function (
        reactGraph,
        sidebarDivs,
        focusInfo
    ) {

    $(document).ready(function () {
        'use strict';
        var graphComponent = reactGraph.renderReactGraph();

        // Set focus button onclicks
        $('.focus').click(function(e) {
            var id = $(this).attr('id');
            var focusDetails = $('#' + id + '-details');

            if (graphComponent.state.highlightedNodes == focusInfo[id + 'FocusList']) {
                graphComponent.setState({highlightedNodes: []});
                focusDetails.animate({height: '2px'}, 'fast');
            } else {
                $('.details').css('height', '2px');
                focusDetails.animate({height: '128px'}, 'fast');
                focusDetails.html(focusInfo[id + 'Description']);
                graphComponent.setState({highlightedNodes: focusInfo[id + 'FocusList']});
            }
        });

        // Sidebar initialization.
        // TODO: move sidebar into its own React component.
        $('#reset').click(function () {
            graphComponent.reset();
        });

        $.ajax({
            url: 'graphs',
            dataType: 'json',
            success: function (data) {
                sidebarDivs.createGraphButtons(data);
                $('.graph-button').click(function () {
                    var id = $(this).data('id');
                    var name = $(this).text();
                    graphComponent.getGraph(name);
                    sidebarDivs.changeFocusEnable(id);
                });
            },
            error: function () {
                throw 'No graphs in database';
            }
        });

        sidebarDivs.activateSidebar();
    });
});
