/**
 * dsh-model-cascade — host half.
 *
 * Pure UI plugin: the empty apply exists so the plugin appears as a Loader
 * entry (name `dsh-model-cascade`); the browser half ships via
 * exports["./client"], discovered through the package.json dsh.client
 * declaration. The composer model seat UI is delivered entirely by the
 * client half (see lib/client.js).
 */
function apply() {}

export { apply };
