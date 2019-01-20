'use strict'

const List = {
    oninit: function(vnode) {
        vnode.state.query = ''
        vnode.state.filteredItems = vnode.attrs.items
    },
    onupdate: function(vnode) {
        if(vnode.attrs.focusedItem() == undefined) {
            vnode.dom.children[0].focus()
        }
    },
    view: function(vnode) {
        let filteredItems = undefined
        if(vnode.state.query == '') {
            filteredItems = vnode.attrs.items
        }
        else if(vnode.attrs.items != undefined) {
            const options = {
                keys: vnode.attrs.searchKeys
            }
            const fuse = new Fuse(vnode.attrs.items, options)
            filteredItems = fuse.search(vnode.state.query)
        }

        return m('.list-container', [
            m('div.list', filteredItems != undefined
                ? [
                    vnode.attrs.back != undefined
                        ? m('div.listentry', {
                            tabindex: 1,
                            onkeyup: (e) => {
                                if(e.keyCode == 13) { vnode.attrs.back() }
                                if(e.keyCode == 40) { e.target.nextSibling.focus() }
                                if(e.keyCode == 37 && vnode.attrs.back != undefined) { vnode.attrs.back() }
                            },
                            onclick: () => vnode.attrs.back()
                        } , m('span', 'Back'))
                        : '',
                    filteredItems.map((item, i) =>
                        m('div.listentry', {
                            tabindex: i + 1,
                            key: item[vnode.attrs.key],
                            onfocus: () => vnode.attrs.focusedItem(item),
                            onkeyup: (e) => {
                                if(e.keyCode == 13 || e.keyCode == 39) { vnode.attrs.enter(item) }
                                if(e.keyCode == 38 && e.target.previousSibling.firstChild != null) { e.target.previousSibling.focus() }
                                if(e.keyCode == 40 && e.target.nextSibling != undefined) { e.target.nextSibling.focus() }
                                if(e.keyCode == 37 && vnode.attrs.back != undefined) { vnode.attrs.back() }
                            },
                            onclick: () => vnode.attrs.enter(item)
                        } , vnode.attrs.item(item, i))
                    )
                ]
                : m('div', m('span', 'Loading ...'))
            ),
            m('input.search[type=text][placeholder=Search ...]', {
                oninput: e => vnode.state.query = e.target.value
            })
        ])
    }
}

const ConferenceList = {
    oninit: function (vnode) {
        vnode.state.conferences = []
        vnode.state.focusedItem = m.stream(undefined)
        m.request({
            method: "GET",
            url: "https://api.media.ccc.de/public/conferences"
        })
        .then(function(result) {
            vnode.state.conferences = result.conferences
            vnode.state.conferences.sort((a, b) => {
                const ad = new Date(a.event_last_released_at)
                const bd = new Date(b.event_last_released_at)
                if (ad < bd) return 1
                if (ad > bd) return -1
                return 0;
            })
        })
    },
    view: function(vnode) {
        return [
            m(List, {
                items: vnode.state.conferences,
                key: 'acronym',
                searchKeys: ['acronym'],
                focusedItem: vnode.state.focusedItem,
                enter: (item) => m.route.set('/cat/' + item.acronym),
                item: (item, _i) => m('div.thumbcontainer[tabIndex=-1]', {
                                        onclick: (e) => e.target.parentNode.focus()
                                    }, m('img.thumb', {src:item.logo_url}), m('span.tiletext',item.title))
            }),
            vnode.state.focusedItem() != undefined
                ? m('img.big-thumb[tabIndex=-1]', {
                    src: vnode.state.focusedItem.logo_url
                })
                : ''
        ]
    }
}

var Conference = {
    oninit: function (vnode) {
        vnode.state.conference = undefined
        vnode.state.focusedItem = m.stream(undefined)
        m.request({
            method: "GET",
            url: "https://api.media.ccc.de/public/conferences/:acronym",
            data: { acronym: vnode.attrs.conferenceAcronym }
        })
        .then(function(result) {
            vnode.state.conference = result
        })
    },
    view: function(vnode) {
        return [
            m(List, {
                items: vnode.state.conference ? vnode.state.conference.events : undefined,
                key: 'guid',
                searchKeys: ['title'],
                focusedItem: vnode.state.focusedItem,
                enter: (item) => m.route.set('/cat/' + vnode.attrs.conferenceAcronym + '/' + item.guid),
                back: () => m.route.set('/cat'),
                item: (item, _i) => m('span[tabIndex=-1]', {
                                        onclick: (e) => e.target.parentNode.focus()
                                    },  item.title)
            }),
            vnode.state.focusedItem() != undefined
                ? m('img.big-thumb[tabIndex=-1]', {
                    src: vnode.state.focusedItem.thumb_url
                })
                : ''
        ]
    }
}

var Event = {
    oninit: function (vnode) {
        vnode.state.focusedItem = m.stream(undefined)
        vnode.state.event = undefined
        m.request({
            method: "GET",
            url: "https://api.media.ccc.de/public/events/:guid",
            data: { guid: vnode.attrs.eventGuid }
        })
        .then(function(result) {
            vnode.state.event = result
            vnode.state.event.recordings.forEach(r => r['id'] = r['url'].split('ecordings/')[1])
        })
    },
    enter: (vnode, i) => m.route.set('/cat/' + vnode.attrs.conferenceAcronym + '/' + vnode.attrs.eventGuid + '/' + i),
    view: function(vnode) {
        return m(List, {
            items: vnode.state.event ? vnode.state.event.recordings : undefined,
            key: 'id',
            searchKeys: ['language', 'mime_type'],
            focusedItem: vnode.state.focusedItem,
            enter: (item) =>  m.route.set('/cat/' + vnode.attrs.conferenceAcronym + '/' + vnode.attrs.eventGuid + '/' + item.id),
            back: () => m.route.set('/cat/' + vnode.attrs.conferenceAcronym),
            item: (item, _i) => m('span[tabIndex=-1]', {
                                    onclick: (e) => e.target.parentNode.focus()
                                }, item.language + ' ' + item.mime_type)
        })
    }
}

var Recording = {
    oninit: function (vnode) {
        vnode.state.focusedItem = m.stream(undefined)
        vnode.state.recording = undefined
        m.request({
            method: "GET",
            url: "https://api.media.ccc.de/public/recordings/:id",
            data: { id: vnode.attrs.recordingId }
        })
        .then(function(result) {
            vnode.state.recording = result
        })
    },
    view: function(vnode) {
        return vnode.state.recording
            ? m('video.big-video[autoplay][controls]', { src: vnode.state.recording.recording_url })
            : ''
    }
}