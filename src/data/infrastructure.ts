/**
 * Mapa de infraestructura de referencia.
 *
 * Sirve para responder, en la ficha de cada herramienta, a una pregunta que el
 * catálogo no contestaba: *¿dónde se enchufa esto?*. En lugar de dibujar un
 * diagrama distinto por producto (imposible de mantener con cientos de fichas),
 * se define UNA topología corporativa genérica y cada categoría marca en ella
 * los planos donde vive, con una explicación de por qué.
 *
 * La geometría vive aquí y no en el componente para que el diagrama sea dato
 * revisable: mover un nodo o añadir una capa no obliga a tocar el SVG a mano.
 */

export interface InfraNode {
  id: string;
  /** Rótulo del nodo dentro del diagrama */
  label: string;
  /** Segunda línea, con ejemplos concretos. Se dibuja más pequeña y en gris. */
  hint: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface InfraEdge {
  from: string;
  to: string;
  /** `flow` = tráfico o datos reales; `control` = política, confianza o telemetría */
  kind: "flow" | "control";
  /** Rótulo opcional sobre la línea */
  label?: string;
}

/** Placement de una categoría: en qué nodos vive y por qué. */
export interface Placement {
  nodes: string[];
  rationale: string;
}

// ── Geometría ──────────────────────────────────────────────────────────────
// Rejilla de 4 columnas × 3 filas, con dos bandas transversales (gobierno
// arriba, observabilidad abajo). viewBox: 0 0 760 416.
const C1 = 24, C2 = 210, C3 = 396, C4 = 582;
const W = 154;
const R2 = 92, R3 = 178, R4 = 264;
const H = 62;

export const VIEWBOX = { w: 760, h: 416 };

export const nodes: InfraNode[] = [
  // Banda superior: el plano de gobierno manda sobre todo lo demás
  { id: "govern", label: "Gobierno, riesgo y cumplimiento", hint: "Políticas, controles, evidencias", x: C1, y: 18, w: C2 + W - C1, h: 46 },
  { id: "ops", label: "Operación y servicio IT", hint: "Incidencias, cambios, inventario", x: C3, y: 18, w: C4 + W - C3, h: 46 },

  // Flujo norte-sur: de fuera hacia dentro
  { id: "internet", label: "Internet y usuarios remotos", hint: "Sedes, teletrabajo, SaaS", x: C1, y: R2, w: W, h: H },
  { id: "edge", label: "Perímetro", hint: "Firewall, proxy, correo, DNS", x: C2, y: R2, w: W, h: H },
  { id: "network", label: "Red interna", hint: "LAN, WiFi, segmentos, VLAN", x: C3, y: R2, w: W, h: H },
  { id: "workloads", label: "Servidores y cloud", hint: "VM, contenedores, IaaS", x: C4, y: R2, w: W, h: H },

  // Segundo plano: lo que cuelga de la red
  { id: "pki", label: "PKI y criptografía", hint: "CA, certificados, claves", x: C1, y: R3, w: W, h: H },
  { id: "identity", label: "Identidad y acceso", hint: "Directorio, SSO, MFA, PAM", x: C2, y: R3, w: W, h: H },
  { id: "endpoints", label: "Puestos y dispositivos", hint: "PC, portátiles, móviles", x: C3, y: R3, w: W, h: H },
  { id: "apps", label: "Aplicaciones y APIs", hint: "Web, servicios, SaaS propio", x: C4, y: R3, w: W, h: H },

  // Tercer plano: soporte al ciclo de vida y a los datos
  { id: "devops", label: "Desarrollo y CI/CD", hint: "Repositorios, pipelines, IaC", x: C1, y: R4, w: W, h: H },
  { id: "ai", label: "Servicios de IA y LLM", hint: "Modelos, agentes, inferencia", x: C2, y: R4, w: W, h: H },
  { id: "thirdparty", label: "Proveedores y terceros", hint: "Cadena de suministro, MSP", x: C3, y: R4, w: W, h: H },
  { id: "data", label: "Datos y copias", hint: "Bases de datos, backup, archivo", x: C4, y: R4, w: W, h: H },

  // Banda inferior: todo emite telemetría hacia aquí
  { id: "soc", label: "Telemetría, SIEM y SOC", hint: "Logs, detección, respuesta", x: C1, y: 350, w: C4 + W - C1, h: 46 },
];

export const edges: InfraEdge[] = [
  { from: "internet", to: "edge", kind: "flow" },
  { from: "edge", to: "network", kind: "flow" },
  { from: "network", to: "workloads", kind: "flow" },
  { from: "network", to: "endpoints", kind: "flow" },
  { from: "workloads", to: "apps", kind: "flow" },
  { from: "apps", to: "data", kind: "flow" },
  { from: "pki", to: "identity", kind: "control" },
  { from: "identity", to: "endpoints", kind: "control" },
  { from: "identity", to: "edge", kind: "control" },
];

export const nodeById = new Map(nodes.map(n => [n.id, n]));

// ── Dónde se sitúa cada categoría ──────────────────────────────────────────
export const placements: Record<string, Placement> = {
  // === CYBERSECURITY ===
  antivirus: { nodes: ["endpoints"], rationale: "Se instala como agente en cada puesto y servidor, el último punto donde un fichero se abre o se ejecuta. Actúa cuando el malware ya ha atravesado el perímetro: por correo, por USB o por descarga cifrada que el proxy no pudo inspeccionar." },
  edr: { nodes: ["endpoints", "soc"], rationale: "Vive en el endpoint —donde se ve la ejecución real de procesos— pero su valor está en el otro extremo: envía telemetría continua al SOC para reconstruir la cadena de ataque y aislar el equipo en remoto. Sin esa consola central es un antivirus caro." },
  firewall: { nodes: ["edge"], rationale: "Es la frontera entre lo que controlas y lo que no. Se sitúa en el punto de corte del tráfico entre Internet y la red interna, y también entre segmentos internos cuando se aplica microsegmentación." },
  siem: { nodes: ["soc"], rationale: "No está en el camino del tráfico: se sitúa fuera, recibiendo logs de todas las capas anteriores. Es la única pieza que ve a la vez el firewall, el directorio, el endpoint y la aplicación, y por eso es donde se correlacionan los eventos que por separado no dicen nada." },
  soar: { nodes: ["soc", "ops"], rationale: "Se coloca detrás del SIEM: consume las alertas ya correlacionadas y ejecuta la respuesta contra el resto de capas (bloquear en el firewall, aislar el endpoint, abrir el ticket). Toca todo el mapa, pero su lugar es el plano de operación de seguridad." },
  dlp: { nodes: ["data", "endpoints"], rationale: "Sigue al dato, no a la máquina: se despliega allí donde el dato puede salir —el puesto de trabajo, el correo, el proxy web y los repositorios—. Por eso una implantación completa toca varias capas a la vez y no solo el perímetro." },
  ids: { nodes: ["network"], rationale: "Se conecta en modo pasivo a un puerto espejo o TAP de la red interna: ve una copia del tráfico y avisa, pero no está en el camino, así que una avería suya no corta el servicio." },
  ips: { nodes: ["edge", "network"], rationale: "A diferencia del IDS, se coloca en línea con el tráfico para poder descartar paquetes. Ese emplazamiento es su ventaja y su riesgo: bloquea al instante, pero un falso positivo o una caída afectan a la conectividad." },
  deception: { nodes: ["network"], rationale: "Siembra activos falsos —credenciales, recursos compartidos, servidores señuelo— dentro de la red ya confiable. Su lugar es el interior justamente porque busca detectar al atacante que ya pasó el perímetro y está moviéndose lateralmente." },
  honeypots: { nodes: ["network"], rationale: "Se despliega como sistema aislado dentro de un segmento donde nadie legítimo tiene motivo para entrar. Cualquier conexión que reciba es, por definición, sospechosa: de ahí su altísima relación señal/ruido." },
  ndr: { nodes: ["network", "soc"], rationale: "Analiza el tráfico este-oeste de la red interna, el que nunca cruza el firewall perimetral. Cubre el punto ciego del EDR (dispositivos sin agente: IoT, OT, impresoras) y vuelca sus detecciones en el SOC." },
  nta: { nodes: ["network"], rationale: "Se alimenta de flujos (NetFlow, IPFIX) o de captura de paquetes en los puntos de agregación de la red. Es la capa de línea base: sirve para saber qué es tráfico normal antes de poder afirmar que algo es anómalo." },
  swg: { nodes: ["edge"], rationale: "Se interpone en la salida a Internet de los usuarios: todo HTTP/HTTPS pasa por él, que descifra, filtra categorías y analiza descargas. En modelos cloud deja de ser una caja en la sede y pasa a ser un servicio al que apunta el dispositivo." },
  waf: { nodes: ["edge", "apps"], rationale: "Se coloca delante de la aplicación web, entre el usuario y el servidor, no en el perímetro de red general. Inspecciona la capa 7 (peticiones HTTP) que un firewall tradicional deja pasar por ser tráfico legítimo hacia el puerto 443." },
  "web-security": { nodes: ["edge", "endpoints"], rationale: "Cubre la navegación desde dos sitios a la vez: la pasarela de salida cuando el usuario está en la oficina y la extensión o agente del propio dispositivo cuando trabaja fuera de la red corporativa." },
  "dns-security": { nodes: ["edge"], rationale: "Se sitúa en la resolución de nombres, el paso previo a cualquier conexión. Bloquear ahí es barato y temprano: corta el dominio malicioso antes de que se establezca la sesión, y detecta exfiltración por túnel DNS que el firewall no mira." },
  "email-security": { nodes: ["edge"], rationale: "Se coloca delante del servidor de correo, reescribiendo el registro MX para que todo mensaje entrante pase por su análisis antes de llegar al buzón. El correo sigue siendo el primer vector de entrada, y esta es su aduana." },
  "api-security": { nodes: ["apps"], rationale: "Vive pegada a la aplicación, no a la red: descubre endpoints no documentados, valida esquemas y detecta abuso de lógica de negocio. Son ataques que viajan como peticiones perfectamente válidas y por eso ni el firewall ni el WAF genérico los ven." },

  // === IDENTITY & ACCESS ===
  "identity-managers": { nodes: ["identity"], rationale: "Es el registro central de quién es quién. Se sitúa como plano transversal porque tanto el puesto como las aplicaciones y el acceso remoto delegan en él la autenticación: en una arquitectura Zero Trust sustituye a la red como perímetro real." },
  pam: { nodes: ["identity", "workloads"], rationale: "Se interpone entre el administrador y el sistema administrado: nadie usa la credencial privilegiada directamente, sino una sesión intermediada, grabada y con contraseña rotada. Su sitio es el paso obligado hacia servidores y consolas críticas." },
  sso: { nodes: ["identity"], rationale: "Se coloca entre el usuario y el catálogo de aplicaciones: estas dejan de guardar contraseñas y pasan a confiar en un token emitido por el proveedor de identidad. Reduce credenciales dispersas y centraliza el punto donde revocar el acceso." },
  mfa: { nodes: ["identity"], rationale: "Se añade al momento de la autenticación, no al de la conexión, por eso protege igual la VPN, el correo web y la consola cloud. Es el control con mejor relación coste/eficacia frente al robo de credenciales." },
  nac: { nodes: ["network", "identity"], rationale: "Actúa en el punto de enganche a la red —puerto de switch o SSID— antes de conceder direccionamiento. Combina identidad y estado del dispositivo para decidir a qué segmento va: es el filtro entre 'estar conectado' y 'estar autorizado'." },

  // === NETWORKING ===
  ngfw: { nodes: ["edge"], rationale: "Ocupa la misma posición que el firewall clásico pero decide por aplicación y usuario en lugar de por puerto e IP, y descifra TLS para ver dentro. En muchas organizaciones concentra además IPS, filtrado web y VPN en el mismo equipo." },
  "sd-wan": { nodes: ["edge", "network"], rationale: "Se despliega en el borde de cada sede y decide por qué enlace sale cada aplicación. Sustituye a la topología MPLS en estrella por rutas directas a la nube, lo que desplaza la seguridad del centro de datos al propio borde." },
  "load-balancers": { nodes: ["edge", "apps"], rationale: "Se sitúa delante del conjunto de servidores que publica un servicio: reparte peticiones, termina TLS y retira de rotación los nodos caídos. Es también donde se apoya la publicación segura y, a menudo, el WAF." },

  // === ENDPOINT & DEVICE MANAGEMENT ===
  mdm: { nodes: ["endpoints"], rationale: "Se sitúa en el dispositivo mediante un perfil de gestión que impone cifrado, código de acceso y aplicaciones permitidas. Es la capa que permite tratar un móvil fuera de la red corporativa como un activo controlado." },
  mam: { nodes: ["endpoints", "apps"], rationale: "Baja un nivel respecto al MDM: no gestiona el aparato entero sino el contenedor de la aplicación corporativa. Es la respuesta al BYOD, donde la empresa no puede administrar un terminal que no es suyo pero sí sus datos dentro de él." },
  "application-control": { nodes: ["endpoints"], rationale: "Se aplica en el momento de la ejecución dentro del puesto: solo corre lo que está en la lista permitida. Detiene malware desconocido que ninguna firma reconocería, a costa de un mantenimiento constante del inventario de software." },
  "usb-device-control": { nodes: ["endpoints"], rationale: "Actúa en los puertos físicos y periféricos del equipo, un canal que ni el firewall ni el proxy ven. Cierra la vía de entrada de malware y de salida de datos que no deja rastro en la red." },

  // === MONITORING & OBSERVABILITY ===
  "server-monitoring": { nodes: ["workloads", "ops"], rationale: "Recoge métricas de cada máquina —agente o consulta remota— y las envía a una consola central. Se sitúa junto a la carga de trabajo porque mide su salud, pero el consumidor real es la operación IT y sus umbrales de servicio." },
  "container-monitoring": { nodes: ["workloads"], rationale: "Se despliega en el nodo o como sidecar, porque el contenedor es efímero: cuando llega la alerta puede que la instancia ya no exista. Por eso la telemetría debe salir del host y no quedarse dentro del propio contenedor." },
  "kubernetes-monitoring": { nodes: ["workloads"], rationale: "Se integra con el plano de control del clúster para ver pods, nodos y recursos como un único sistema. Sin esa vista, un problema de planificación o de límites de recursos aparece como fallos aleatorios de aplicaciones sin relación entre sí." },
  "log-management": { nodes: ["soc"], rationale: "Es la capa previa al SIEM: centraliza y normaliza logs de toda la infraestructura antes de que nadie los correlacione. Su emplazamiento fuera de los sistemas de origen es también un control de integridad: el atacante que borra huellas locales no alcanza la copia remota." },
  "cloud-monitoring": { nodes: ["workloads"], rationale: "Se conecta por API al proveedor cloud en lugar de instalarse en máquinas. Es la única forma de ver servicios gestionados —colas, funciones, balanceadores— donde no existe un sistema operativo en el que poner un agente." },
  "kpi-ca-managers": { nodes: ["govern", "ops"], rationale: "No mide máquinas sino controles y objetivos de servicio. Se sitúa en el plano de gobierno porque su salida alimenta el cuadro de mando de dirección y la evidencia de que un control se ejecuta con la frecuencia comprometida." },

  // === BACKUP & DISASTER RECOVERY ===
  "enterprise-backup": { nodes: ["data"], rationale: "Se sitúa detrás de las cargas de trabajo, con acceso a sus datos pero en un dominio de fallo distinto. Esa separación es la razón de ser de la copia: si comparte credenciales y red con lo que protege, un ransomware se lleva ambos por delante." },
  "endpoint-backup": { nodes: ["data", "endpoints"], rationale: "Cubre el dato que nunca llegó al servidor: lo que el usuario guarda en su portátil. Copia contra un destino en la nube porque el dispositivo puede estar semanas sin tocar la red corporativa." },
  "cloud-backup": { nodes: ["data"], rationale: "Coloca la copia fuera de las instalaciones por diseño, cubriendo el escenario de desastre físico. La contrapartida está en el tiempo de restauración: recuperar terabytes por Internet marca el RTO real, no el catálogo." },
  "saas-backup": { nodes: ["data", "apps"], rationale: "Se conecta por API a la aplicación SaaS porque el proveedor garantiza disponibilidad, no retención frente a un borrado propio. El modelo de responsabilidad compartida deja el dato del cliente en su lado del reparto." },
  "m365-backup": { nodes: ["data", "apps"], rationale: "Extrae por API los buzones, sitios y equipos de Microsoft 365 hacia un almacén independiente del inquilino. Cubre el hueco entre la papelera de retención y una restauración de fecha concreta tras un borrado masivo." },
  "google-workspace-backup": { nodes: ["data", "apps"], rationale: "Copia por API el correo, Drive y calendarios a un repositorio ajeno al dominio de Google, para poder restaurar tras un borrado propagado o la baja de una cuenta con contenido compartido." },
  "immutable-backup": { nodes: ["data"], rationale: "Se sitúa en el almacenamiento de destino, no en el proceso de copia: el dato queda bloqueado durante un plazo y ni el administrador puede alterarlo. Es la respuesta directa al ransomware que ataca primero al servidor de backup." },
  "ransomware-recovery": { nodes: ["data", "soc"], rationale: "Trabaja sobre el repositorio de copias, pero añade la parte que falta a un backup convencional: verificar que el punto de restauración elegido es anterior al compromiso y está limpio, evitando reinfectar al recuperar." },

  // === CLOUD & INFRASTRUCTURE ===
  "cloud-migration": { nodes: ["workloads"], rationale: "Actúa entre el centro de datos de origen y el destino cloud durante una ventana temporal: descubre dependencias, replica y sincroniza hasta el corte. Es infraestructura de tránsito, no una pieza permanente del mapa." },
  "serverless-management": { nodes: ["workloads", "apps"], rationale: "Se sitúa en la frontera donde ya no hay servidor que gestionar: la unidad de despliegue es la función. El control se desplaza al permiso de cada invocación y al tiempo de arranque en frío, no a parches ni capacidad." },
  "cloud-cost": { nodes: ["workloads", "ops"], rationale: "Consume la facturación y las métricas de uso del proveedor y las devuelve atribuidas por equipo o proyecto. Su lugar está entre la infraestructura y la operación: el consumo cloud es una decisión técnica con efecto contable inmediato." },

  // === DEVOPS & SOFTWARE SECURITY ===
  git: { nodes: ["devops"], rationale: "Es el origen de la cadena: todo lo que acaba ejecutándose en producción nace aquí. Su historial es además una fuente de auditoría, porque registra quién cambió qué y cuándo." },
  scm: { nodes: ["devops"], rationale: "Rodea al repositorio con revisión por pares, permisos y disparadores de integración. Es el punto de control donde se aplican los requisitos de segregación de funciones antes de que un cambio avance." },
  "ci-cd": { nodes: ["devops", "workloads"], rationale: "Es el puente entre el código y la infraestructura, y por eso concentra credenciales de despliegue sobre producción. Un pipeline comprometido equivale a un administrador comprometido: se audita como tal." },
  "config-managers": { nodes: ["devops", "workloads"], rationale: "Se sitúa sobre servidores y dispositivos ya desplegados para llevarlos a un estado declarado y corregir desviaciones. Convierte la configuración en código versionado, que es lo que permite demostrar en auditoría cómo estaba un sistema en una fecha." },
  "secrets-management": { nodes: ["devops", "pki"], rationale: "Se interpone entre la aplicación y la credencial: nadie escribe una contraseña en el código, la pide en ejecución con una identidad verificable. Suele acompañarse de rotación automática y de secretos de vida corta." },
  "api-management": { nodes: ["apps"], rationale: "Se coloca delante del conjunto de APIs como puerta única: autentica, aplica cuotas, versiona y registra cada llamada. Sin esa capa, cada servicio reimplementa por su cuenta el control de acceso y el registro." },
  "api-testing": { nodes: ["devops", "apps"], rationale: "Se ejecuta en el pipeline contra la API ya desplegada en un entorno de prueba. Detecta el fallo de contrato o de autorización antes del despliegue, cuando corregirlo cuesta una fracción de lo que costará en producción." },
  "code-quality": { nodes: ["devops"], rationale: "Se sitúa lo más a la izquierda posible del ciclo: analiza el código antes de compilarse o desplegarse. Es el punto donde una vulnerabilidad se corrige con un commit en lugar de con una respuesta a incidente." },
  "key-managers": { nodes: ["pki"], rationale: "Custodia el material criptográfico —a menudo respaldado por un HSM— y presta operaciones de firma o cifrado sin exponer nunca la clave. Es la raíz de confianza de la que dependen el cifrado de datos y los certificados." },

  // === ITSM & IT OPERATIONS ===
  "incident-management": { nodes: ["ops"], rationale: "Se sitúa entre quien detecta y quien resuelve, monitorización y usuarios incluidos. Es donde se materializan los acuerdos de nivel de servicio, porque el reloj del SLA empieza cuando se registra el ticket." },
  "problem-management": { nodes: ["ops"], rationale: "Trabaja por detrás de la gestión de incidencias, sobre el histórico ya cerrado, buscando la causa común. Su valor no es la velocidad de respuesta sino la reducción del volumen de incidencias recurrentes." },
  "change-management": { nodes: ["ops", "govern"], rationale: "Se interpone entre la intención de cambiar algo y la infraestructura, con aprobación y ventana definidas. Es un control de auditoría de primer orden: la mayoría de las caídas graves nacen de un cambio no evaluado." },
  "request-management": { nodes: ["ops"], rationale: "Es la puerta de entrada de lo previsible —altas, permisos, equipamiento— separada del canal de incidencias. Al catalogar y automatizar el alta de accesos, deja además la traza de quién autorizó cada permiso." },
  "it-asset-managers": { nodes: ["ops", "endpoints"], rationale: "Recorre la red y los puestos para mantener el inventario de qué hay y con qué licencia. Es la base de casi cualquier otro control: no se puede parchear, cifrar ni auditar un activo que no figura en ninguna lista." },

  // === GRC, RISK & COMPLIANCE ===
  "risk-management": { nodes: ["govern"], rationale: "Se sitúa por encima de la infraestructura: no ejecuta controles, decide cuáles hacen falta. Traduce hallazgos técnicos dispersos en riesgos con propietario, probabilidad e impacto que la dirección puede priorizar." },
  "compliance-management": { nodes: ["govern"], rationale: "Actúa como capa de mapeo entre normas (ISO 27001, ENS, NIS2, DORA) y los controles ya implantados abajo. Su función es evitar auditar cinco veces el mismo control por exigirlo cinco marcos distintos." },
  "audit-management": { nodes: ["govern"], rationale: "Se sitúa en el plano de gobierno, con acceso de solo lectura a los sistemas auditados. Gestiona el ciclo completo —plan, pruebas, hallazgos, seguimiento— y conserva la evidencia con su fecha y su origen." },
  "policy-management": { nodes: ["govern"], rationale: "Es el origen documental del que cuelgan los controles técnicos de todas las capas. Su parte auditable no es publicar la política, sino demostrar que cada empleado la recibió, la leyó y la aceptó en su versión vigente." },
  "security-awareness": { nodes: ["govern", "endpoints"], rationale: "Interviene en la única capa que ningún producto cubre: la persona delante del equipo. Se sitúa entre el gobierno, que fija la obligación formativa, y el puesto de trabajo, donde se simula el phishing y se mide la reincidencia." },
  "business-continuity": { nodes: ["govern", "data"], rationale: "Se apoya en la capa de datos y recuperación, pero decide desde arriba: qué procesos son críticos y cuánto pueden estar caídos. Fija los RTO y RPO que la solución de backup luego tiene que cumplir." },
  "third-party-security": { nodes: ["thirdparty", "govern"], rationale: "Mira hacia afuera del perímetro, a los proveedores con acceso a tus datos o a tu red. Es el plano donde se materializa el riesgo de cadena de suministro, que no se detecta con ninguna herramienta interna." },

  // === PKI & CRYPTOGRAPHY ===
  "cert-managers": { nodes: ["pki"], rationale: "Es la raíz de confianza de la que dependen el TLS de las aplicaciones, la autenticación por certificado y la firma de código. Se sitúa como plano transversal porque emite para toda la organización, no para un sistema concreto." },
  "certificate-lifecycle": { nodes: ["pki", "apps"], rationale: "Se sitúa entre la autoridad de certificación y los sistemas que usan los certificados, automatizando emisión y renovación. Su justificación es operativa: la causa más frecuente de caída por certificado es la caducidad de uno que nadie tenía inventariado." },
  timestamping: { nodes: ["pki"], rationale: "Añade a una firma la prueba de cuándo existió el documento, emitida por un tercero de confianza. Es lo que sostiene el no repudio a largo plazo, cuando el certificado del firmante ya haya caducado." },
  "eidas-trust": { nodes: ["pki", "govern"], rationale: "Se sitúa donde la criptografía adquiere valor jurídico: prestadores cualificados cuya firma o sello tiene efecto legal en la UE. La pieza técnica es la misma, lo que cambia es la supervisión y el régimen de responsabilidad." },

  // === AI & AI SECURITY ===
  "ai-governance": { nodes: ["govern", "ai"], rationale: "Se sitúa sobre el ciclo de vida del modelo, no dentro de él: inventario de sistemas de IA, clasificación de riesgo y trazabilidad de decisiones. Es la capa que responde al Reglamento europeo de IA, cuyo sujeto es la organización y no el modelo." },
  "ai-security-tool": { nodes: ["ai"], rationale: "Protege el propio modelo y su pipeline frente a ataques que no existen en el software tradicional: envenenamiento de datos de entrenamiento, ejemplos adversariales y extracción del modelo. Se sitúa junto al activo de IA porque ninguna capa de red ve esas amenazas." },
  "ai-spm": { nodes: ["ai", "soc"], rationale: "Descubre qué modelos, datos y claves de API de IA hay realmente desplegados —incluida la IA en la sombra— y evalúa su exposición. Es el equivalente al CSPM, aplicado a un inventario que suele crecer más rápido de lo que TI registra." },
  "ai-firewall": { nodes: ["ai", "edge"], rationale: "Se interpone en el camino de la petición al modelo, inspeccionando prompt y respuesta. Ocupa frente al LLM la misma posición que un WAF frente a una aplicación web: en línea, en capa de aplicación y sin acceso al modelo." },
  "llm-security": { nodes: ["ai"], rationale: "Actúa en la frontera entre la instrucción del sistema y la entrada del usuario, que en un LLM comparten el mismo canal. De ahí nacen la inyección de prompt y la fuga de contexto, que no tienen equivalente en una aplicación convencional." },
  "llm-gateway": { nodes: ["ai", "apps"], rationale: "Concentra en un único punto las llamadas de toda la organización a modelos de distintos proveedores: aplica cuotas, enruta, registra y evita que cada equipo gestione sus propias claves. Es el punto donde el consumo de IA se vuelve auditable." },
  "model-risk": { nodes: ["ai", "govern"], rationale: "Valida el modelo como se valida un control financiero: quién lo aprobó, con qué datos, con qué deriva medida y cuándo toca revisarlo. Se sitúa en gobierno porque la pregunta que responde es de responsabilidad, no de rendimiento." },
  "ai-data-security": { nodes: ["ai", "data"], rationale: "Se sitúa entre el repositorio de datos y el modelo, controlando qué entra en entrenamiento o en el contexto de inferencia. Es donde se evita que un dato personal o confidencial acabe memorizado y devuelto a otro usuario." },
};

/** Respaldo por familia para cualquier categoría aún sin placement propio. */
export const familyFallback: Record<string, Placement> = {
  cybersecurity: { nodes: ["edge", "soc"], rationale: "Se sitúa en las capas de defensa: el punto donde se inspecciona el tráfico o el comportamiento, y la consola central donde se investiga lo detectado." },
  "identity-access": { nodes: ["identity"], rationale: "Vive en el plano de identidad, transversal a toda la infraestructura: es el que decide quién accede a qué, con independencia de la red por la que llegue." },
  networking: { nodes: ["edge", "network"], rationale: "Forma parte del transporte: se sitúa en el borde o en el núcleo de la red, en el camino que sigue todo el tráfico." },
  "endpoint-device": { nodes: ["endpoints"], rationale: "Se despliega en el dispositivo del usuario, la capa más expuesta y la más difícil de mantener homogénea." },
  monitoring: { nodes: ["workloads", "soc"], rationale: "Observa desde fuera del camino del tráfico: recoge métricas y registros de las capas de ejecución y los centraliza." },
  "backup-dr": { nodes: ["data"], rationale: "Se sitúa en la capa de datos, en un dominio de fallo distinto al del sistema que protege." },
  "cloud-infra": { nodes: ["workloads"], rationale: "Opera sobre la capa de cómputo y almacenamiento donde se ejecutan los servicios." },
  "devops-software": { nodes: ["devops"], rationale: "Se sitúa antes de producción, en la cadena que lleva del código al despliegue." },
  "itsm-itops": { nodes: ["ops"], rationale: "Vive en el plano de operación: coordina personas y procesos por encima de los sistemas." },
  "grc-risk": { nodes: ["govern"], rationale: "Se sitúa en el plano de gobierno: no ejecuta controles técnicos, define cuáles hacen falta y recoge su evidencia." },
  "pki-crypto": { nodes: ["pki"], rationale: "Es raíz de confianza transversal: de ella dependen el cifrado, la autenticación y la firma del resto de capas." },
  "ai-security": { nodes: ["ai"], rationale: "Acompaña a los servicios de IA, una capa reciente con amenazas propias que las defensas tradicionales no cubren." },
};

/** Placement efectivo de una categoría, con respaldo por familia. */
export function getPlacement(categoryId?: string, familyId?: string): Placement | null {
  if (categoryId && placements[categoryId]) return placements[categoryId];
  if (familyId && familyFallback[familyId]) return familyFallback[familyId];
  return null;
}
