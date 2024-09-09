var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { R as React, h as helmetPkg, r as reactExports, j as jsxRuntimeExports } from "./index.js";
const { Helmet: HelmetHead } = helmetPkg;
const EXCLUDE_PROPS = ["charSet"];
const propToMetaTag = (parentKey, parentValue, options) => {
  if (Array.isArray(parentValue)) {
    return parentValue.flatMap((value) => {
      return propToMetaTag(parentKey, value, options);
    });
  } else if (typeof parentValue === "object") {
    return Object.entries(parentValue).filter(([_, v]) => v !== null).flatMap(([key, value]) => {
      return propToMetaTag(`${parentKey}:${key}`, value, { attr: "property" });
    });
  } else {
    const attributes = {
      [options["attr"]]: parentKey,
      content: parentValue
    };
    return /* @__PURE__ */ React.createElement("meta", { ...attributes });
  }
};
const Metadata = (props) => {
  const { children, ...metaProps } = props;
  let Head = HelmetHead;
  const tags = Object.entries(metaProps).filter(
    ([key, value]) => !EXCLUDE_PROPS.includes(key) && value !== null && (key !== "og" || value !== true)
  ).flatMap(([key, value]) => {
    return propToMetaTag(key, value, { attr: "name" });
  }).filter((tag) => !!tag);
  if (metaProps.title) {
    [metaProps.title].flat().reverse().map((title) => {
      tags.unshift(/* @__PURE__ */ React.createElement("title", null, title));
    });
  }
  if (metaProps.charSet) {
    tags.push(/* @__PURE__ */ React.createElement("meta", { charSet: metaProps.charSet }));
  }
  if (metaProps.og) {
    if (metaProps.title && !metaProps.og.title && metaProps.og.title !== null) {
      tags.push(/* @__PURE__ */ React.createElement("meta", { property: "og:title", content: metaProps.title }));
    }
    if (metaProps.description && !metaProps.og.description && metaProps.og.description !== null) {
      tags.push(
        /* @__PURE__ */ React.createElement("meta", { property: "og:description", content: metaProps.description })
      );
    }
    if (!metaProps.og.type && metaProps.og.type !== null) {
      tags.push(/* @__PURE__ */ React.createElement("meta", { property: "og:type", content: "website" }));
    }
  }
  return /* @__PURE__ */ React.createElement(Head, null, tags.map((tag, i) => React.cloneElement(tag, { key: i })), children);
};
const createHistory = () => {
  const listeners = {};
  const blockers = [];
  let beforeUnloadListener = null;
  const history = {
    listen: (listener) => {
      const listenerId = "RW_HISTORY_LISTENER_ID_" + Date.now();
      listeners[listenerId] = listener;
      globalThis.addEventListener("popstate", listener);
      return listenerId;
    },
    navigate: (to, options) => {
      const performNavigation = () => {
        var _a, _b, _c, _d;
        const { pathname, search, hash } = new URL(
          ((_a = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _a.origin) + to
        );
        if (((_b = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _b.pathname) !== pathname || ((_c = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _c.search) !== search || ((_d = globalThis == null ? void 0 : globalThis.location) == null ? void 0 : _d.hash) !== hash) {
          if (options == null ? void 0 : options.replace) {
            globalThis.history.replaceState({}, "", to);
          } else {
            globalThis.history.pushState({}, "", to);
          }
        }
        for (const listener of Object.values(listeners)) {
          listener();
        }
      };
      if (blockers.length > 0) {
        processBlockers(0, performNavigation);
      } else {
        performNavigation();
      }
    },
    back: () => {
      const performBack = () => {
        globalThis.history.back();
        for (const listener of Object.values(listeners)) {
          listener();
        }
      };
      if (blockers.length > 0) {
        processBlockers(0, performBack);
      } else {
        performBack();
      }
    },
    remove: (listenerId) => {
      if (listeners[listenerId]) {
        const listener = listeners[listenerId];
        globalThis.removeEventListener("popstate", listener);
        delete listeners[listenerId];
      } else {
        console.warn(
          "History Listener with ID: " + listenerId + " does not exist."
        );
      }
    },
    block: (id, callback) => {
      const existingBlockerIndex = blockers.findIndex(
        (blocker) => blocker.id === id
      );
      if (existingBlockerIndex !== -1) {
        blockers[existingBlockerIndex] = { id, callback };
      } else {
        blockers.push({ id, callback });
        if (blockers.length === 1) {
          addBeforeUnloadListener();
        }
      }
    },
    unblock: (id) => {
      const index = blockers.findIndex((blocker) => blocker.id === id);
      if (index !== -1) {
        blockers.splice(index, 1);
        if (blockers.length === 0) {
          removeBeforeUnloadListener();
        }
      }
    }
  };
  const processBlockers = (index, navigate2) => {
    if (index < blockers.length) {
      blockers[index].callback({
        retry: () => processBlockers(index + 1, navigate2)
      });
    } else {
      navigate2();
    }
  };
  const addBeforeUnloadListener = () => {
    if (!beforeUnloadListener) {
      beforeUnloadListener = (event) => {
        if (blockers.length > 0) {
          event.preventDefault();
        }
      };
      globalThis.addEventListener("beforeunload", beforeUnloadListener);
    }
  };
  const removeBeforeUnloadListener = () => {
    if (beforeUnloadListener) {
      globalThis.removeEventListener("beforeunload", beforeUnloadListener);
      beforeUnloadListener = null;
    }
  };
  return history;
};
const gHistory = createHistory();
const { navigate, back, block, unblock } = gHistory;
const Link = reactExports.forwardRef(({ to, onClick, options, ...rest }, ref) => /* @__PURE__ */ React.createElement(
  "a",
  {
    href: to,
    ref,
    ...rest,
    onClick: (event) => {
      if (event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      event.preventDefault();
      if (onClick) {
        const result = onClick(event);
        if (typeof result !== "boolean" || result) {
          navigate(to, options);
        }
      } else {
        navigate(to, options);
      }
    }
  }
));
function createNamedContext(name, defaultValue) {
  const Ctx = reactExports.createContext(defaultValue);
  Ctx.displayName = name;
  return Ctx;
}
const LocationContext = createNamedContext("Location");
class LocationProvider extends React.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "HISTORY_LISTENER_ID");
    __publicField(this, "state", {
      context: this.getContext()
    });
  }
  getContext() {
    let windowLocation;
    if (typeof window !== "undefined") {
      const { pathname } = window.location;
      switch (this.props.trailingSlashes) {
        case "never":
          if (pathname.endsWith("/")) {
            window.history.replaceState(
              {},
              "",
              pathname.substr(0, pathname.length - 1)
            );
          }
          break;
        case "always":
          if (!pathname.endsWith("/")) {
            window.history.replaceState({}, "", pathname + "/");
          }
          break;
      }
      windowLocation = new URL(window.location.href);
    }
    return this.props.location || this.context || windowLocation;
  }
  // componentDidMount() is not called during server rendering (aka SSR and
  // prerendering)
  componentDidMount() {
    this.HISTORY_LISTENER_ID = gHistory.listen(() => {
      const context = this.getContext();
      this.setState((lastState) => {
        var _a, _b;
        if ((context == null ? void 0 : context.pathname) !== ((_a = lastState == null ? void 0 : lastState.context) == null ? void 0 : _a.pathname) || (context == null ? void 0 : context.search) !== ((_b = lastState == null ? void 0 : lastState.context) == null ? void 0 : _b.search)) {
          globalThis == null ? void 0 : globalThis.scrollTo(0, 0);
        }
        return { context };
      });
    });
  }
  componentWillUnmount() {
    if (this.HISTORY_LISTENER_ID) {
      gHistory.remove(this.HISTORY_LISTENER_ID);
    }
  }
  render() {
    return /* @__PURE__ */ React.createElement(LocationContext.Provider, { value: this.state.context }, this.props.children);
  }
}
// When prerendering, there might be more than one level of location
// providers. Use the values from the one above.
// (this is basically the class component version of `useLocation()`)
__publicField(LocationProvider, "contextType", LocationContext);
const useLocation = () => {
  const location = React.useContext(LocationContext);
  if (location === void 0) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return location;
};
function paramsForRoute(route) {
  const params = [...route.matchAll(/\{([^}]+)\}/g)];
  return params.map((match) => match[1]).map((match) => {
    const parts = match.split(":");
    let name = parts[0];
    if (name.endsWith("...")) {
      name = name.slice(0, -3);
    }
    let type = parts[1];
    if (!type) {
      type = match.endsWith("...") ? "Glob" : "String";
    }
    return [name, type, `{${match}}`];
  });
}
const coreParamTypes = {
  String: {
    match: /[^/]+/
  },
  Int: {
    match: /\d+/,
    parse: Number
  },
  Float: {
    match: /[-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/,
    parse: Number
  },
  Boolean: {
    match: /true|false/,
    parse: (boolAsString) => boolAsString === "true"
  },
  Glob: {
    match: /.*/
  }
};
function matchPath(routeDefinition, pathname, {
  userParamTypes,
  matchSubPaths
} = {
  userParamTypes: {},
  matchSubPaths: false
}) {
  const allParamTypes = { ...coreParamTypes, ...userParamTypes };
  const { matchRegex, routeParams: routeParamsDefinition } = getRouteRegexAndParams(routeDefinition, {
    matchSubPaths,
    allParamTypes
  });
  const matches = [...pathname.matchAll(matchRegex)];
  if (matches.length === 0) {
    return { match: false };
  }
  const providedParams = matches[0].slice(1);
  if (routeParamsDefinition.length > 0) {
    const params = providedParams.reduce(
      (acc, value, index) => {
        const [name, transformName] = routeParamsDefinition[index];
        const typeInfo = allParamTypes[transformName];
        let transformedValue = value;
        if (typeof (typeInfo == null ? void 0 : typeInfo.parse) === "function") {
          transformedValue = typeInfo.parse(value);
        }
        return {
          ...acc,
          [name]: transformedValue
        };
      },
      {}
    );
    return { match: true, params };
  }
  return { match: true };
}
function getRouteRegexAndParams(route, {
  matchSubPaths = false,
  allParamTypes = coreParamTypes
} = {}) {
  var _a;
  let typeMatchingRoute = route;
  const routeParams = paramsForRoute(route);
  for (const [_name, type, match] of routeParams) {
    const matcher = (_a = allParamTypes[type]) == null ? void 0 : _a.match;
    const typeRegexp = (matcher == null ? void 0 : matcher.source) || "[^/]+";
    typeMatchingRoute = typeMatchingRoute.replace(match, `(${typeRegexp})`);
  }
  const matchRegex = matchSubPaths ? new RegExp(`^${typeMatchingRoute}(?:/.*)?$`, "g") : new RegExp(`^${typeMatchingRoute}$`, "g");
  const matchRegexString = matchSubPaths ? `^${typeMatchingRoute}(?:/.*)?$` : `^${typeMatchingRoute}$`;
  return {
    matchRegex,
    routeParams,
    matchRegexString
  };
}
function parseSearch(search) {
  const searchParams = new URLSearchParams(search);
  return [...searchParams.keys()].reduce(
    (params, key) => ({
      ...params,
      [key]: searchParams.get(key)
    }),
    {}
  );
}
function flattenSearchParams(queryString) {
  const searchParams = [];
  for (const [key, value] of Object.entries(parseSearch(queryString))) {
    searchParams.push({ [key]: value });
  }
  return searchParams;
}
const useMatch = (routePath, options) => {
  const location = useLocation();
  if (!location) {
    return { match: false };
  }
  if (options == null ? void 0 : options.searchParams) {
    const locationParams = new URLSearchParams(location.search);
    const hasUnmatched = options.searchParams.some((param) => {
      if (typeof param === "string") {
        return !locationParams.has(param);
      } else {
        return Object.keys(param).some(
          (key) => param[key] != locationParams.get(key)
        );
      }
    });
    if (hasUnmatched) {
      return { match: false };
    }
  }
  const matchInfo = matchPath(routePath, location.pathname, {
    matchSubPaths: options == null ? void 0 : options.matchSubPaths
  });
  if (!matchInfo.match) {
    return { match: false };
  }
  const routeParams = Object.entries((options == null ? void 0 : options.routeParams) || {});
  if (routeParams.length > 0) {
    if (!isMatchWithParams(matchInfo) || !matchInfo.params) {
      return { match: false };
    }
    const isParamMatch = routeParams.every(([key, value]) => {
      return matchInfo.params[key] === value;
    });
    if (!isParamMatch) {
      return { match: false };
    }
  }
  return matchInfo;
};
function isMatchWithParams(match) {
  return match !== null && typeof match === "object" && "params" in match;
}
reactExports.forwardRef(
  ({
    to,
    activeClassName,
    activeMatchParams,
    matchSubPaths,
    className,
    onClick,
    ...rest
  }, ref) => {
    const [pathname, queryString] = to.split("?");
    const searchParams = activeMatchParams || flattenSearchParams(queryString);
    const matchInfo = useMatch(pathname, {
      searchParams,
      matchSubPaths
    });
    return /* @__PURE__ */ React.createElement(
      Link,
      {
        ref,
        to,
        onClick,
        className: matchInfo.match ? activeClassName : className,
        ...rest
      }
    );
  }
);
const Redirect = ({ to, options }) => {
  reactExports.useEffect(() => {
    navigate(to, options);
  }, [to, options]);
  return null;
};
createNamedContext("PageLoading");
createNamedContext("Params");
if (typeof window !== "undefined") {
  const redwoodAppElement = document.getElementById("redwood-app");
  if (redwoodAppElement && redwoodAppElement.children.length > 0) ;
}
const namedRoutes = {};
const RouterStateContext = reactExports.createContext(void 0);
const useRouterState = () => {
  const context = reactExports.useContext(RouterStateContext);
  if (context === void 0) {
    throw new Error(
      "useRouterState must be used within a RouterContextProvider"
    );
  }
  return context;
};
const AuthenticatedRoute = ({
  unauthenticated,
  roles,
  whileLoadingAuth,
  children
}) => {
  const routerState = useRouterState();
  const {
    loading: authLoading,
    isAuthenticated,
    hasRole
  } = routerState.useAuth();
  const unauthorized = reactExports.useCallback(() => {
    return !(isAuthenticated && (!roles || hasRole(roles)));
  }, [isAuthenticated, roles, hasRole]);
  if (unauthorized()) {
    if (authLoading) {
      return (whileLoadingAuth == null ? void 0 : whileLoadingAuth()) || null;
    } else {
      const currentLocation = globalThis.location.pathname + encodeURIComponent(globalThis.location.search);
      const generatedRoutesMap = namedRoutes;
      if (!generatedRoutesMap[unauthenticated]) {
        throw new Error(`We could not find a route named ${unauthenticated}`);
      }
      let unauthenticatedPath;
      try {
        unauthenticatedPath = generatedRoutesMap[unauthenticated]();
      } catch (e) {
        if (e instanceof Error && /Missing parameter .* for route/.test(e.message)) {
          throw new Error(
            `Redirecting to route "${unauthenticated}" would require route parameters, which currently is not supported. Please choose a different route`
          );
        }
        throw new Error(
          `Could not redirect to the route named ${unauthenticated}`
        );
      }
      return /* @__PURE__ */ React.createElement(Redirect, { to: `${unauthenticatedPath}?redirectTo=${currentLocation}` });
    }
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
reactExports.memo(({ sets, children }) => {
  if (!sets || sets.length === 0) {
    return children;
  }
  return sets.reduceRight((acc, set) => {
    let wrapped = set.wrappers.reduceRight((acc2, Wrapper, index) => {
      return React.createElement(
        Wrapper,
        { ...set.props, key: set.id + "-" + index },
        acc2
      );
    }, acc);
    if (set.isPrivate) {
      const unauthenticated = set.props.unauthenticated;
      if (!unauthenticated || typeof unauthenticated !== "string") {
        throw new Error(
          "You must specify an `unauthenticated` route when using PrivateSet"
        );
      }
      wrapped = /* @__PURE__ */ React.createElement(AuthenticatedRoute, { ...set.props, unauthenticated }, wrapped);
    }
    return wrapped;
  }, children);
});
const defaultId = "reach-skip-nav";
const SkipNavLink = reactExports.forwardRef(function SkipNavLink2({ as: Comp = "a", children = "Skip to content", contentId, ...props }, forwardedRef) {
  const id = contentId || defaultId;
  return /* @__PURE__ */ reactExports.createElement(
    Comp,
    {
      ...props,
      ref: forwardedRef,
      href: `#${id}`,
      "data-reach-skip-link": "",
      "data-reach-skip-nav-link": ""
    },
    children
  );
});
SkipNavLink.displayName = "SkipNavLink";
const SkipNavContent = reactExports.forwardRef(function SkipNavContent2({ as: Comp = "div", id: idProp, ...props }, forwardedRef) {
  const id = idProp || defaultId;
  return /* @__PURE__ */ reactExports.createElement(
    Comp,
    {
      ...props,
      ref: forwardedRef,
      id,
      "data-reach-skip-nav-content": ""
    }
  );
});
SkipNavContent.displayName = "SkipNavContent";
const HomePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metadata, { title: "Home", description: "Home page" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "HomePage" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Find me in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "./web/src/pages/HomePage/HomePage.tsx" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "My default route is named ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "home" }),
      ", link to me with `",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.home(), children: "Home" }),
      "`"
    ] })
  ] });
};
export {
  HomePage as default
};
