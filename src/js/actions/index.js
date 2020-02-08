import * as UIActions from "./UIActions"
import * as contractActions from "./contractActions"
import * as settingsActions from "./settingsActions"

export default {
    ...UIActions,
    ...contractActions,
    ...settingsActions,
}