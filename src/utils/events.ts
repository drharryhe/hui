const EvtStdoutMsg = 'EvtStdOutMsg'
const EvtStartRun = 'EvtStartRun'
const EvtRunDone = 'EvtRunDone'
const EvtTriggerMenuDataSourceFilter = 'EvtTriggerMenuDataSourceFilter'
const EvtTriggerMenuDataSourceRefresh = 'EvtTriggerMenuDataSourceRefresh'
const EvtTriggerMenuDataSourceRepl = 'EvtTriggerMenuDataSourceRepl'

function UniEventKey(): string {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return 'Evt' + S4() + S4();
}

export default {
    UniEventKey,
    EvtStartRun,
    EvtRunDone,
    EvtTriggerMenuDataSourceFilter,
    EvtTriggerMenuDataSourceRefresh,
    EvtTriggerMenuDataSourceRepl
}