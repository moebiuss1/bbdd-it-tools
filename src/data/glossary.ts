/**
 * Contenido del glosario — vocabulario del sector, no catálogo de producto.
 *
 * Separado a propósito de `categories.ts`: aquel define la taxonomía que ordena
 * el directorio; este define qué significa cada término. Los `id` del grupo
 * "producto" coinciden con los de las categorías para que ambos ficheros se
 * puedan contrastar, pero el glosario no enlaza a herramientas: eso es trabajo
 * del directorio.
 */

export type TermGroup = "producto" | "normativa" | "concepto";

export interface GlossaryTerm {
  id: string;
  /** Cómo se nombra habitualmente en el sector */
  term: string;
  /** Desarrollo de las siglas, si las tiene */
  expansion?: string;
  group: TermGroup;
  /** Solo para el grupo "producto": familia a la que pertenece */
  family?: string;
  definition: string;
  /** Qué mirar cuando se audita o se evalúa una solución de este tipo */
  evaluar?: string;
  /** Otros términos con los que se confunde o se complementa */
  related?: string[];
}

export interface FamilyDetail {
  /** Qué abarca la familia, en una frase larga */
  scope: string;
  /** Preguntas que se hace un auditor ante esta familia */
  audit: string;
}

export const familyDetails: Record<string, FamilyDetail> = {
  cybersecurity: {
    scope:
      "Agrupa las tecnologías cuyo objetivo directo es impedir, detectar o contener un ataque: protección de puestos y servidores, defensa perimetral y de red, correlación de eventos y automatización de la respuesta. Es la familia más poblada porque el mercado ha ido especializando cada capa del ataque en un producto distinto.",
    audit:
      "¿Hay cobertura en las tres fases (prevención, detección, respuesta) o solo en la primera? ¿Los eventos de cada producto llegan a un punto común de correlación? ¿Quién mira las alertas fuera del horario laboral?",
  },
  "identity-access": {
    scope:
      "Todo lo relativo a quién es cada usuario, qué puede hacer y cómo se demuestra: directorios de identidad, federación, segundo factor, gobierno de permisos y control de las cuentas privilegiadas.",
    audit:
      "¿Existe una fuente única de identidad? ¿Hay revisión periódica de permisos y baja efectiva de usuarios? ¿Las cuentas de administración están bajo custodia y grabación de sesión?",
  },
  networking: {
    scope:
      "Infraestructura de conectividad y su seguridad: cortafuegos de nueva generación, redes definidas por software entre sedes y distribución de carga entre servidores.",
    audit:
      "¿Está la red segmentada de forma que un equipo comprometido no alcance los sistemas críticos? ¿Las reglas del cortafuegos se revisan y se depuran, o solo se añaden?",
  },
  "endpoint-device": {
    scope:
      "Administración y protección del parque de dispositivos: portátiles, móviles y tabletas, incluyendo el control de qué aplicaciones y qué periféricos se permiten.",
    audit:
      "¿Se conoce el inventario real de dispositivos con acceso a datos corporativos? ¿Puede borrarse en remoto un equipo perdido? ¿Los dispositivos personales están separados del dato corporativo?",
  },
  monitoring: {
    scope:
      "Observación continua del estado de sistemas, aplicaciones y servicios: métricas, trazas, registros y cuadros de mando que permiten detectar una degradación antes de que sea una incidencia.",
    audit:
      "¿Los registros se conservan el tiempo que exige la norma aplicable? ¿Están protegidos frente a manipulación? ¿Hay umbrales de alerta definidos o solo gráficos que nadie mira?",
  },
  "backup-dr": {
    scope:
      "Copia, custodia y recuperación del dato, desde la copia diaria de un servidor hasta la recuperación completa del servicio en otra ubicación tras un desastre.",
    audit:
      "¿Cuándo se probó por última vez una restauración completa? ¿Existe una copia inmutable o fuera de línea que el ransomware no pueda cifrar? ¿Los objetivos de RPO y RTO están escritos y se cumplen?",
  },
  "cloud-infra": {
    scope:
      "Servicios de nube pública y privada y las herramientas para migrar a ellos, gobernarlos y controlar su coste.",
    audit:
      "¿Está clara la frontera de responsabilidad compartida con el proveedor? ¿Hay control de la configuración de los recursos creados o cada equipo despliega a su criterio?",
  },
  "devops-software": {
    scope:
      "El ciclo de vida del software: control de versiones, integración y entrega continuas, calidad y seguridad del código, gestión de secretos y publicación de APIs.",
    audit:
      "¿Se revisa el código antes de fusionarlo? ¿Hay secretos escritos en el repositorio? ¿La cadena de construcción está protegida frente a alteraciones?",
  },
  "itsm-itops": {
    scope:
      "Gestión del servicio de TI conforme a marcos como ITIL: incidencias, problemas, cambios, peticiones y el inventario de activos que los soporta.",
    audit:
      "¿Todo cambio en producción deja rastro y aprobación? ¿Los incidentes recurrentes escalan a gestión de problemas o se cierran uno a uno indefinidamente?",
  },
  "grc-risk": {
    scope:
      "Gobierno, riesgo y cumplimiento: registro de riesgos, mapeo de controles frente a normas, gestión de auditorías y evidencias, políticas, formación y evaluación de terceros.",
    audit:
      "¿El registro de riesgos está vivo o se actualizó una vez para pasar la certificación? ¿Cada control tiene un responsable nombrado y una evidencia asociada?",
  },
  "pki-crypto": {
    scope:
      "Infraestructura de clave pública y servicios de confianza: emisión y ciclo de vida de certificados, sellado de tiempo, firma electrónica y custodia de claves en hardware.",
    audit:
      "¿Existe inventario de certificados y aviso de caducidad? ¿Las claves privadas críticas están en un HSM? ¿Hay procedimiento de revocación probado?",
  },
  "ai-security": {
    scope:
      "Gobernanza y seguridad de los sistemas de inteligencia artificial: inventario de modelos, control de la exposición de datos, defensa frente a ataques específicos de LLM y evidencias para ISO 42001 o el Reglamento Europeo de IA.",
    audit:
      "¿Existe inventario de los modelos y usos de IA de la organización? ¿Se registra qué datos se envían a modelos de terceros? ¿Hay revisión humana en las decisiones de alto impacto?",
  },
};

export const terms: GlossaryTerm[] = [
  // ─────────────────────────────────────── PRODUCTO · Cybersecurity
  {
    id: "antivirus", term: "Antivirus", group: "producto", family: "cybersecurity",
    definition: "Software que identifica y neutraliza código malicioso en un equipo combinando firmas de amenazas conocidas, reglas heurísticas y análisis del comportamiento de los procesos en ejecución.",
    evaluar: "Tasa de detección en pruebas independientes (AV-Comparatives, AV-TEST), impacto en el rendimiento del equipo y capacidad de gestión centralizada del parque.",
    related: ["edr", "epp"],
  },
  {
    id: "edr", term: "EDR", expansion: "Endpoint Detection and Response", group: "producto", family: "cybersecurity",
    definition: "Evolución del antivirus que registra de forma continua la actividad del endpoint (procesos, conexiones, cambios en el registro) y permite investigar y contener una intrusión en curso, no solo bloquear un fichero conocido.",
    evaluar: "Profundidad de la telemetría y su retención, calidad de la línea temporal del incidente, capacidad de aislar un equipo en remoto y disponibilidad de servicio gestionado (MDR).",
    related: ["antivirus", "xdr", "mdr", "ndr"],
  },
  {
    id: "firewall", term: "Cortafuegos", expansion: "Firewall", group: "producto", family: "cybersecurity",
    definition: "Dispositivo o software que decide qué tráfico de red se permite y cuál se descarta aplicando un conjunto ordenado de reglas sobre origen, destino, puerto y protocolo.",
    evaluar: "Higiene del conjunto de reglas (reglas huérfanas, reglas 'any-any'), registro del tráfico denegado y proceso de aprobación de cambios.",
    related: ["ngfw", "waf", "ips"],
  },
  {
    id: "siem", term: "SIEM", expansion: "Security Information and Event Management", group: "producto", family: "cybersecurity",
    definition: "Plataforma que centraliza los registros de todos los sistemas, los normaliza y los correlaciona para generar alertas de seguridad y conservar la evidencia. Es la pieza sobre la que se construye un centro de operaciones de seguridad.",
    evaluar: "Fuentes realmente ingestadas frente a las que deberían estarlo, coste por volumen de datos, tiempo de retención y número de reglas de correlación en uso frente a las de fábrica.",
    related: ["soar", "log-management", "ndr", "soc"],
  },
  {
    id: "soar", term: "SOAR", expansion: "Security Orchestration, Automation and Response", group: "producto", family: "cybersecurity",
    definition: "Capa de automatización que ejecuta manuales de respuesta (playbooks) sobre las alertas del SIEM: enriquecer un indicador, abrir un ticket, bloquear una IP o aislar un equipo sin intervención manual.",
    evaluar: "Número de integraciones nativas con la pila existente, facilidad para escribir un playbook sin programar y porcentaje real de alertas automatizadas.",
    related: ["siem", "soc"],
  },
  {
    id: "dlp", term: "DLP", expansion: "Data Loss Prevention", group: "producto", family: "cybersecurity",
    definition: "Conjunto de controles que identifica información sensible por su contenido o su etiqueta y bloquea o registra su salida por correo, web, dispositivos extraíbles o impresión.",
    evaluar: "Calidad de la clasificación previa del dato, volumen de falsos positivos y si el modo activo está realmente en bloqueo o solo en monitorización indefinida.",
    related: ["usb-device-control", "clasificacion-dato", "insider-risk"],
  },
  {
    id: "ids", term: "IDS", expansion: "Intrusion Detection System", group: "producto", family: "cybersecurity",
    definition: "Sistema que inspecciona el tráfico o la actividad de un host y avisa cuando reconoce un patrón de ataque. Detecta y notifica, pero no interrumpe la comunicación.",
    evaluar: "Ubicación de las sondas respecto a los segmentos críticos, actualización del juego de firmas y destino de las alertas.",
    related: ["ips", "ndr", "hids"],
  },
  {
    id: "ips", term: "IPS", expansion: "Intrusion Prevention System", group: "producto", family: "cybersecurity",
    definition: "La misma inspección que un IDS pero situada en línea con el tráfico, de modo que puede descartar el paquete y cortar la conexión cuando reconoce el ataque.",
    evaluar: "Riesgo de falso positivo sobre tráfico legítimo, latencia introducida y política de actualización de firmas en producción.",
    related: ["ids", "ngfw"],
  },
  {
    id: "deception", term: "Deception Technology", expansion: "Tecnología de engaño", group: "producto", family: "cybersecurity",
    definition: "Despliegue deliberado de credenciales, servicios y equipos falsos dentro de la red para que un atacante interactúe con ellos y delate su presencia. Cualquier acceso a un señuelo es, por definición, actividad ilegítima.",
    evaluar: "Verosimilitud de los señuelos, ausencia de falsos positivos y facilidad para desplegarlos sin interferir con la operación real.",
    related: ["honeypots"],
  },
  {
    id: "honeypots", term: "Honeypot", expansion: "Tarro de miel", group: "producto", family: "cybersecurity",
    definition: "Sistema trampa expuesto a propósito, sin valor operativo, cuyo único fin es atraer intentos de intrusión y registrar las técnicas del atacante.",
    evaluar: "Aislamiento respecto a la red productiva: un señuelo mal segmentado es un punto de entrada real.",
    related: ["deception"],
  },
  {
    id: "ndr", term: "NDR", expansion: "Network Detection and Response", group: "producto", family: "cybersecurity",
    definition: "Detección de amenazas basada en el análisis del tráfico de red y de sus desviaciones respecto al comportamiento habitual, sin depender de un agente instalado en el equipo.",
    evaluar: "Cobertura del tráfico este-oeste (entre servidores) además del norte-sur, capacidad de analizar tráfico cifrado por metadatos y coste de las sondas.",
    related: ["nta", "ids", "edr"],
  },
  {
    id: "nta", term: "NTA", expansion: "Network Traffic Analysis", group: "producto", family: "cybersecurity",
    definition: "Análisis del tráfico de red orientado a entender qué se comunica con qué y detectar anomalías. Es el término previo al que la industria acabó llamando NDR al añadirle capacidad de respuesta.",
    related: ["ndr"],
  },
  {
    id: "swg", term: "SWG", expansion: "Secure Web Gateway", group: "producto", family: "cybersecurity",
    definition: "Pasarela por la que se hace pasar la navegación de los usuarios para filtrar categorías de contenido, inspeccionar descargas y aplicar la política de uso aceptable.",
    evaluar: "Tratamiento del tráfico cifrado, impacto en la experiencia de usuario y cobertura del empleado fuera de la oficina.",
    related: ["web-security", "sase", "casb"],
  },
  {
    id: "waf", term: "WAF", expansion: "Web Application Firewall", group: "producto", family: "cybersecurity",
    definition: "Cortafuegos especializado en el nivel de aplicación que inspecciona peticiones HTTP para frenar inyección SQL, cross-site scripting y otros ataques del OWASP Top 10 antes de que lleguen a la aplicación.",
    evaluar: "Si está en modo bloqueo o solo detección, ajuste de reglas al comportamiento real de la aplicación y protección frente a bots y abuso de API.",
    related: ["firewall", "api-security", "owasp-top-10"],
  },
  {
    id: "web-security", term: "Seguridad web", group: "producto", family: "cybersecurity",
    definition: "Conjunto de controles sobre la navegación del usuario: filtrado de URL, bloqueo de páginas de phishing, aislamiento del navegador y control de descargas.",
    related: ["swg", "phishing"],
  },
  {
    id: "dns-security", term: "Seguridad DNS", group: "producto", family: "cybersecurity",
    definition: "Protección de la resolución de nombres frente a envenenamiento de caché, exfiltración por túnel DNS y dominios generados algorítmicamente. Es un punto de control barato porque casi toda conexión empieza por una consulta DNS.",
    evaluar: "Que no existan resolutores alternativos configurados que esquiven el control.",
    related: ["dns-tunneling"],
  },
  {
    id: "email-security", term: "Seguridad del correo", group: "producto", family: "cybersecurity",
    definition: "Filtrado del correo entrante y saliente para detener phishing, suplantación, adjuntos maliciosos y fuga de información, habitualmente combinado con el análisis de enlaces en el momento del clic.",
    evaluar: "Configuración de SPF, DKIM y DMARC en los dominios propios, tratamiento del fraude del CEO y tasa de correos legítimos retenidos.",
    related: ["phishing", "dmarc", "bec"],
  },
  {
    id: "api-security", term: "Seguridad de API", group: "producto", family: "cybersecurity",
    definition: "Descubrimiento del inventario real de APIs expuestas y protección frente a abuso, autorización rota a nivel de objeto y exposición excesiva de datos.",
    evaluar: "Existencia de APIs no documentadas ('shadow API'), autenticación por endpoint y límites de uso por consumidor.",
    related: ["api-management", "waf", "owasp-top-10"],
  },

  // ─────────────────────────────────────── PRODUCTO · Identity & Access
  {
    id: "identity-managers", term: "IAM", expansion: "Identity and Access Management", group: "producto", family: "identity-access",
    definition: "Plataforma que centraliza el ciclo de vida de la identidad digital —alta, modificación y baja— y decide a qué recursos accede cada usuario.",
    evaluar: "Automatización real del alta y la baja desde recursos humanos, y qué ocurre con los accesos de un empleado que cambia de puesto.",
    related: ["sso", "iga", "pam", "mfa"],
  },
  {
    id: "pam", term: "PAM", expansion: "Privileged Access Management", group: "producto", family: "identity-access",
    definition: "Custodia de las credenciales de administración en una bóveda, con concesión temporal del acceso, rotación automática de contraseñas y grabación de la sesión privilegiada.",
    evaluar: "Cobertura de las cuentas de servicio y de los equipos de red, no solo de los administradores de dominio; y si las contraseñas rotan de verdad.",
    related: ["identity-managers", "just-in-time"],
  },
  {
    id: "sso", term: "SSO", expansion: "Single Sign-On", group: "producto", family: "identity-access",
    definition: "Mecanismo que permite autenticarse una sola vez y acceder a múltiples aplicaciones mediante federación con protocolos como SAML u OpenID Connect.",
    evaluar: "Aplicaciones que quedan fuera del SSO con contraseña local, y qué pasa con la sesión cuando se desactiva al usuario en el proveedor de identidad.",
    related: ["saml", "oidc", "identity-managers"],
  },
  {
    id: "mfa", term: "MFA", expansion: "Multi-Factor Authentication", group: "producto", family: "identity-access",
    definition: "Verificación de la identidad mediante al menos dos factores independientes: algo que se sabe, algo que se tiene y algo que se es.",
    evaluar: "Resistencia al phishing del factor elegido —una llave FIDO2 no es equiparable a un SMS— y cobertura del acceso administrativo y del acceso remoto.",
    related: ["fido2", "sso", "phishing"],
  },
  {
    id: "nac", term: "NAC", expansion: "Network Access Control", group: "producto", family: "identity-access",
    definition: "Control que decide si un dispositivo puede conectarse a la red y a qué segmento, en función de su identidad y de que cumpla la política de seguridad (antivirus activo, parches al día).",
    evaluar: "Tratamiento de dispositivos que no admiten agente (impresoras, OT, IoT) y existencia de una VLAN de cuarentena operativa.",
    related: ["zero-trust", "segmentacion"],
  },

  // ─────────────────────────────────────── PRODUCTO · Networking
  {
    id: "ngfw", term: "NGFW", expansion: "Next-Generation Firewall", group: "producto", family: "networking",
    definition: "Cortafuegos que además del filtrado por puerto y dirección identifica la aplicación y el usuario concretos, e integra prevención de intrusiones e inspección del tráfico cifrado.",
    evaluar: "Caída de rendimiento al activar la inspección TLS y si las reglas se han migrado de verdad al modelo por aplicación o siguen siendo reglas por puerto.",
    related: ["firewall", "ips", "sase"],
  },
  {
    id: "sd-wan", term: "SD-WAN", expansion: "Software-Defined Wide Area Network", group: "producto", family: "networking",
    definition: "Gestión centralizada por software de las conexiones entre sedes, que reparte el tráfico entre varios enlaces según su calidad y la prioridad de cada aplicación.",
    evaluar: "Cifrado del tráfico entre sedes y si la administración del plano de control está protegida con doble factor.",
    related: ["sase"],
  },
  {
    id: "load-balancers", term: "Balanceador de carga", expansion: "Load Balancer", group: "producto", family: "networking",
    definition: "Elemento que reparte las peticiones entrantes entre varios servidores para mantener el servicio disponible y aprovechar la capacidad instalada.",
    evaluar: "Comprobación de salud de los nodos, terminación del cifrado y comportamiento ante la caída de un nodo.",
  },

  // ─────────────────────────────────────── PRODUCTO · Endpoint & Device
  {
    id: "mdm", term: "MDM", expansion: "Mobile Device Management", group: "producto", family: "endpoint-device",
    definition: "Administración remota de los dispositivos móviles corporativos: inscripción, aplicación de políticas, despliegue de aplicaciones, cifrado y borrado a distancia.",
    evaluar: "Diferenciación entre dispositivo corporativo y personal, y si el borrado remoto se ha probado alguna vez.",
    related: ["mam", "uem", "byod"],
  },
  {
    id: "mam", term: "MAM", expansion: "Mobile Application Management", group: "producto", family: "endpoint-device",
    definition: "Control acotado a las aplicaciones corporativas y sus datos, sin administrar el dispositivo completo. Es la vía habitual para el dispositivo personal del empleado.",
    related: ["mdm", "byod"],
  },
  {
    id: "application-control", term: "Control de aplicaciones", group: "producto", family: "endpoint-device",
    definition: "Política que define qué ejecutables pueden correr en un equipo. En su versión estricta —lista blanca— solo se ejecuta lo expresamente autorizado, lo que neutraliza el malware desconocido.",
    evaluar: "Coste operativo de mantener la lista y existencia de un procedimiento ágil de excepción.",
    related: ["antivirus", "edr"],
  },
  {
    id: "usb-device-control", term: "Control de dispositivos", group: "producto", family: "endpoint-device",
    definition: "Restricción de los periféricos que pueden conectarse al equipo —memorias USB, discos externos, adaptadores de red— por tipo, fabricante o número de serie.",
    related: ["dlp"],
  },

  // ─────────────────────────────────────── PRODUCTO · Monitoring
  {
    id: "server-monitoring", term: "Monitorización de servidores", group: "producto", family: "monitoring",
    definition: "Vigilancia del estado y el rendimiento de servidores físicos y virtuales: uso de CPU, memoria, disco, disponibilidad de servicios y alertas asociadas.",
    related: ["observabilidad", "sla"],
  },
  {
    id: "container-monitoring", term: "Monitorización de contenedores", group: "producto", family: "monitoring",
    definition: "Supervisión de cargas efímeras en Docker o runtimes equivalentes, donde el objeto observado vive minutos y la métrica debe asociarse al servicio, no a la máquina.",
    related: ["kubernetes-monitoring"],
  },
  {
    id: "kubernetes-monitoring", term: "Monitorización de Kubernetes", group: "producto", family: "monitoring",
    definition: "Observación de clústeres Kubernetes en sus distintos planos: nodos, pods, servicios, controladores y consumo frente a los límites declarados.",
    related: ["container-monitoring", "observabilidad"],
  },
  {
    id: "log-management", term: "Gestión de registros", expansion: "Log Management", group: "producto", family: "monitoring",
    definition: "Recogida, indexación, búsqueda y retención de los registros de sistemas y aplicaciones. Se distingue del SIEM en que no incorpora necesariamente correlación de seguridad.",
    evaluar: "Plazo de conservación frente al exigido por la norma aplicable, integridad de los registros y sincronización horaria de las fuentes.",
    related: ["siem", "observabilidad"],
  },
  {
    id: "cloud-monitoring", term: "Monitorización cloud", group: "producto", family: "monitoring",
    definition: "Supervisión de recursos y servicios contratados en nube pública, donde no hay acceso al sistema operativo subyacente y la telemetría la publica el propio proveedor.",
    related: ["cloud-cost", "observabilidad"],
  },
  {
    id: "kpi-ca-managers", term: "Gestión de KPI y controles", group: "producto", family: "monitoring",
    definition: "Herramientas para definir indicadores de rendimiento y de control, recoger su valor de forma periódica y presentarlo a dirección o al comité de seguridad.",
    evaluar: "Que el indicador mida el resultado y no la actividad, y que tenga umbral, responsable y periodicidad.",
    related: ["compliance-management"],
  },

  // ─────────────────────────────────────── PRODUCTO · Backup & DR
  {
    id: "enterprise-backup", term: "Copia de seguridad empresarial", group: "producto", family: "backup-dr",
    definition: "Plataforma de copia para grandes volúmenes y entornos heterogéneos, con políticas por tipo de dato, deduplicación y catálogo centralizado de las copias.",
    evaluar: "Cumplimiento de la regla 3-2-1, verificación automática de la copia y última prueba documentada de restauración.",
    related: ["rpo", "rto", "immutable-backup", "regla-321"],
  },
  {
    id: "endpoint-backup", term: "Copia de puestos de trabajo", group: "producto", family: "backup-dr",
    definition: "Copia continua de los datos que residen en portátiles y estaciones de trabajo, que en la práctica suelen quedar fuera del respaldo de servidores.",
    related: ["enterprise-backup"],
  },
  {
    id: "cloud-backup", term: "Copia en la nube", group: "producto", family: "backup-dr",
    definition: "Respaldo cuyo destino es almacenamiento de un proveedor cloud, con replicación entre regiones y recuperación bajo demanda.",
    evaluar: "Ubicación geográfica del dato, cifrado con clave propia y coste de la salida de datos al restaurar.",
    related: ["enterprise-backup", "soberania-dato"],
  },
  {
    id: "saas-backup", term: "Copia de SaaS", group: "producto", family: "backup-dr",
    definition: "Copia de los datos alojados en aplicaciones de terceros. Existe porque el modelo de responsabilidad compartida deja el dato del cliente fuera de la garantía del proveedor: este responde de la plataforma, no de un borrado del usuario.",
    evaluar: "Que exista, sencillamente: es la carencia más habitual en organizaciones que han migrado a la nube.",
    related: ["m365-backup", "responsabilidad-compartida"],
  },
  {
    id: "m365-backup", term: "Copia de Microsoft 365", group: "producto", family: "backup-dr",
    definition: "Respaldo específico de Exchange Online, SharePoint, OneDrive y Teams, con retención propia e independiente de la papelera de reciclaje del servicio.",
    related: ["saas-backup"],
  },
  {
    id: "google-workspace-backup", term: "Copia de Google Workspace", group: "producto", family: "backup-dr",
    definition: "Respaldo de Gmail, Drive, Calendar y Sites con retención y capacidad de restauración granular por usuario.",
    related: ["saas-backup"],
  },
  {
    id: "immutable-backup", term: "Copia inmutable", group: "producto", family: "backup-dr",
    definition: "Copia que no puede modificarse ni borrarse durante un periodo fijado, ni siquiera por un administrador con credenciales válidas. Es la defensa concreta frente a un ransomware que busca destruir las copias antes de cifrar.",
    evaluar: "Que la inmutabilidad la imponga el almacenamiento y no una opción de la consola de copia, que un atacante con acceso podría desactivar.",
    related: ["ransomware-recovery", "ransomware", "air-gap"],
  },
  {
    id: "ransomware-recovery", term: "Recuperación ante ransomware", group: "producto", family: "backup-dr",
    definition: "Capacidades orientadas a volver a operar tras un cifrado masivo: detección de la anomalía en la copia, identificación del último punto limpio y restauración a un entorno aislado para verificarlo.",
    related: ["immutable-backup", "ransomware", "rto"],
  },

  // ─────────────────────────────────────── PRODUCTO · Cloud & Infra
  {
    id: "cloud-migration", term: "Migración a la nube", group: "producto", family: "cloud-infra",
    definition: "Herramientas y servicios para trasladar cargas de trabajo desde el centro de datos propio a nube pública, con inventario de dependencias y réplica previa al corte.",
    evaluar: "Plan de vuelta atrás y ventana real de indisponibilidad.",
  },
  {
    id: "serverless-management", term: "Gestión serverless", group: "producto", family: "cloud-infra",
    definition: "Despliegue y gobierno de funciones que se ejecutan sin servidor administrado —Lambda, Azure Functions—, donde el proveedor asume el sistema operativo y el escalado.",
    evaluar: "Permisos de ejecución de cada función: el exceso de privilegio es el fallo característico de estos entornos.",
  },
  {
    id: "cloud-cost", term: "FinOps", expansion: "Cloud Cost Management", group: "producto", family: "cloud-infra",
    definition: "Disciplina y herramientas para atribuir, prever y reducir el gasto en nube, repartiendo el coste entre equipos y detectando recursos infrautilizados.",
    related: ["cloud-monitoring"],
  },

  // ─────────────────────────────────────── PRODUCTO · DevOps
  {
    id: "git", term: "Git", group: "producto", family: "devops-software",
    definition: "Sistema de control de versiones distribuido: cada copia del repositorio contiene el historial completo, lo que permite trabajar y ramificar sin servidor central.",
    related: ["scm"],
  },
  {
    id: "scm", term: "SCM", expansion: "Source Code Management", group: "producto", family: "devops-software",
    definition: "Plataforma que aloja los repositorios y añade revisión de código, control de permisos, seguimiento de incidencias e integración continua.",
    evaluar: "Protección de la rama principal, obligatoriedad de la revisión y detección de secretos en los commits.",
    related: ["git", "ci-cd", "secrets-management"],
  },
  {
    id: "ci-cd", term: "CI/CD", expansion: "Continuous Integration / Continuous Delivery", group: "producto", family: "devops-software",
    definition: "Automatización de la construcción, prueba y despliegue del software cada vez que cambia el código, de modo que la entrega deje de ser un acontecimiento manual.",
    evaluar: "Quién puede modificar la definición de la canalización y dónde se guardan las credenciales de despliegue.",
    related: ["scm", "sbom", "supply-chain"],
  },
  {
    id: "config-managers", term: "Gestión de configuración", group: "producto", family: "devops-software",
    definition: "Herramientas que declaran el estado deseado de la infraestructura y lo aplican de forma repetible, corrigiendo la desviación de los sistemas respecto a esa definición.",
    evaluar: "Cobertura del parque frente a los equipos configurados a mano.",
    related: ["iac"],
  },
  {
    id: "secrets-management", term: "Gestión de secretos", group: "producto", family: "devops-software",
    definition: "Almacén cifrado y auditado para contraseñas de servicio, claves de API y certificados, con emisión dinámica y caducidad corta en lugar de credenciales estáticas eternas.",
    evaluar: "Secretos aún presentes en repositorios, ficheros de configuración o variables de entorno de la canalización.",
    related: ["key-managers", "pam"],
  },
  {
    id: "api-management", term: "Gestión de API", group: "producto", family: "devops-software",
    definition: "Plataforma que publica APIs a través de una pasarela común y gestiona su ciclo de vida: versionado, autenticación, límites de uso, documentación y analítica de consumo.",
    related: ["api-security", "api-testing"],
  },
  {
    id: "api-testing", term: "Pruebas de API", group: "producto", family: "devops-software",
    definition: "Verificación automatizada del comportamiento funcional, el rendimiento y la seguridad de una API frente a su contrato declarado.",
    related: ["api-management"],
  },
  {
    id: "code-quality", term: "Calidad de código", group: "producto", family: "devops-software",
    definition: "Análisis estático y dinámico del código fuente para localizar defectos, vulnerabilidades y deuda técnica antes de que lleguen a producción.",
    evaluar: "Que el análisis bloquee la fusión al superar un umbral, en vez de generar un informe que nadie lee.",
    related: ["sast", "dast", "sca"],
  },
  {
    id: "key-managers", term: "Gestión de claves", expansion: "Key Management", group: "producto", family: "devops-software",
    definition: "Custodia y gobierno del ciclo de vida de las claves criptográficas: generación, distribución, rotación, archivado y destrucción.",
    evaluar: "Si las claves críticas residen en un HSM certificado y si la rotación está automatizada.",
    related: ["hsm", "secrets-management", "cert-managers"],
  },

  // ─────────────────────────────────────── PRODUCTO · ITSM
  {
    id: "incident-management", term: "Gestión de incidencias", group: "producto", family: "itsm-itops",
    definition: "Proceso que registra, clasifica y resuelve las interrupciones del servicio con el objetivo de restablecerlo cuanto antes, aunque sea con una solución temporal.",
    evaluar: "Coherencia entre la prioridad asignada y el impacto real, y cumplimiento de los tiempos comprometidos.",
    related: ["problem-management", "sla", "itil"],
  },
  {
    id: "problem-management", term: "Gestión de problemas", group: "producto", family: "itsm-itops",
    definition: "Proceso complementario al anterior que busca la causa raíz de las incidencias recurrentes para eliminarla, en lugar de resolver cada aparición por separado.",
    related: ["incident-management", "itil"],
  },
  {
    id: "change-management", term: "Gestión de cambios", group: "producto", family: "itsm-itops",
    definition: "Control de las modificaciones sobre los sistemas en producción mediante evaluación previa del riesgo, aprobación, ventana de ejecución y plan de reversión.",
    evaluar: "Proporción de cambios de emergencia sobre el total: una cifra alta indica que el proceso se está esquivando.",
    related: ["itil"],
  },
  {
    id: "request-management", term: "Gestión de peticiones", group: "producto", family: "itsm-itops",
    definition: "Atención de las solicitudes ordinarias de servicio —alta de usuario, permiso, equipo— a través de un catálogo con flujos de aprobación y automatización del cumplimiento.",
    related: ["itil", "identity-managers"],
  },
  {
    id: "it-asset-managers", term: "ITAM", expansion: "IT Asset Management", group: "producto", family: "itsm-itops",
    definition: "Inventario y gobierno del ciclo de vida de los activos tecnológicos, desde la compra hasta la retirada segura, incluyendo el control de licencias.",
    evaluar: "Concordancia entre el inventario declarado y el descubrimiento automático de la red; sin inventario fiable, ningún otro control es verificable.",
    related: ["cmdb", "sam"],
  },

  // ─────────────────────────────────────── PRODUCTO · GRC
  {
    id: "risk-management", term: "Gestión de riesgos", group: "producto", family: "grc-risk",
    definition: "Identificación, análisis, valoración y tratamiento de los riesgos que amenazan los objetivos de la organización, con un registro vivo y un responsable por riesgo.",
    evaluar: "Que la valoración siga una metodología declarada, que el riesgo residual esté aceptado formalmente y que el registro se revise con periodicidad fijada.",
    related: ["iso-27005", "riesgo-residual", "apetito-riesgo"],
  },
  {
    id: "compliance-management", term: "Gestión del cumplimiento", group: "producto", family: "grc-risk",
    definition: "Mapeo de las obligaciones normativas y contractuales sobre un conjunto de controles, con recogida continua de la evidencia que demuestra su aplicación.",
    evaluar: "Reutilización de un mismo control para varias normas y automatización de la evidencia frente a la captura manual de pantallas.",
    related: ["audit-management", "iso-27001", "soc-2"],
  },
  {
    id: "audit-management", term: "Gestión de auditorías", group: "producto", family: "grc-risk",
    definition: "Planificación del programa de auditoría, ejecución de las pruebas, registro de hallazgos y seguimiento de los planes de acción hasta su cierre.",
    evaluar: "Trazabilidad entre hallazgo, acción correctiva, responsable y fecha; y verificación de la eficacia de la acción, no solo de su ejecución.",
    related: ["no-conformidad", "compliance-management"],
  },
  {
    id: "policy-management", term: "Gestión de políticas", group: "producto", family: "grc-risk",
    definition: "Redacción, aprobación, publicación y revisión periódica del cuerpo normativo interno, con registro de la aceptación por parte de cada empleado.",
    evaluar: "Fecha de la última revisión y evidencia de la difusión; una política aprobada hace cinco años y desconocida por la plantilla no es un control.",
  },
  {
    id: "security-awareness", term: "Concienciación en seguridad", group: "producto", family: "grc-risk",
    definition: "Programas de formación y simulación —notablemente campañas de phishing controladas— destinados a reducir el riesgo asociado al comportamiento de las personas.",
    evaluar: "Evolución de la tasa de clic entre campañas y refuerzo dirigido a los usuarios reincidentes, más que el porcentaje de cursos completados.",
    related: ["phishing"],
  },
  {
    id: "business-continuity", term: "Continuidad de negocio", expansion: "BCM · Business Continuity Management", group: "producto", family: "grc-risk",
    definition: "Marco que garantiza que los procesos críticos siguen operando ante una interrupción grave, a partir de un análisis de impacto que fija qué es crítico y en qué plazo debe recuperarse.",
    evaluar: "Existencia de un BIA actualizado, planes probados mediante simulacro y coherencia entre los RTO declarados y la capacidad técnica real.",
    related: ["iso-22301", "bia", "rto", "rpo", "drp"],
  },
  {
    id: "third-party-security", term: "Riesgo de terceros", expansion: "TPRM · Third-Party Risk Management", group: "producto", family: "grc-risk",
    definition: "Evaluación y vigilancia continua de la seguridad de proveedores y socios con acceso a datos o sistemas propios, mediante cuestionarios, certificaciones y puntuación externa.",
    evaluar: "Existencia de inventario de proveedores clasificado por criticidad y de cláusulas contractuales de seguridad y notificación de brechas.",
    related: ["supply-chain", "due-diligence"],
  },

  // ─────────────────────────────────────── PRODUCTO · PKI
  {
    id: "cert-managers", term: "Gestión de certificados", group: "producto", family: "pki-crypto",
    definition: "Plataforma que descubre, inventaría y administra los certificados digitales X.509 de la organización, avisando de caducidades y automatizando renovaciones.",
    evaluar: "Certificados desconocidos en producción y dependencia de recordatorios en el calendario de una persona concreta.",
    related: ["certificate-lifecycle", "pki", "x509"],
  },
  {
    id: "certificate-lifecycle", term: "CLM", expansion: "Certificate Lifecycle Management", group: "producto", family: "pki-crypto",
    definition: "Automatización completa del ciclo del certificado —solicitud, emisión, instalación, renovación y revocación—, habitualmente mediante el protocolo ACME.",
    related: ["cert-managers", "pki"],
  },
  {
    id: "timestamping", term: "Sellado de tiempo", group: "producto", family: "pki-crypto",
    definition: "Servicio que asocia a un documento una marca temporal firmada por un tercero de confianza, acreditando que ese contenido existía en ese instante.",
    related: ["eidas-trust", "no-repudio"],
  },
  {
    id: "eidas-trust", term: "Servicios de confianza eIDAS", group: "producto", family: "pki-crypto",
    definition: "Servicios regulados por el Reglamento eIDAS —firma y sello electrónico, sellado de tiempo, entrega electrónica certificada y autenticación web— prestados por proveedores cualificados con reconocimiento legal en toda la Unión Europea.",
    evaluar: "Que el prestador figure en la lista de confianza (TSL) nacional y que el nivel de firma empleado sea el que exige el trámite.",
    related: ["eidas", "timestamping", "firma-cualificada"],
  },

  // ─────────────────────────────────────── PRODUCTO · AI
  {
    id: "ai-governance", term: "Gobernanza de IA", group: "producto", family: "ai-security",
    definition: "Marco que inventaría los sistemas de inteligencia artificial de la organización, los clasifica por riesgo y documenta datos de entrenamiento, decisiones y supervisión humana.",
    evaluar: "Existencia del inventario y clasificación conforme al Reglamento Europeo de IA; sin él no puede determinarse qué obligaciones aplican.",
    related: ["iso-42001", "ai-act", "model-risk"],
  },
  {
    id: "ai-security-tool", term: "Seguridad de la IA", group: "producto", family: "ai-security",
    definition: "Protección de los sistemas de aprendizaje automático frente a ataques específicos: ejemplos adversariales, envenenamiento del conjunto de entrenamiento, extracción del modelo e inferencia de pertenencia.",
    related: ["ai-spm", "llm-security"],
  },
  {
    id: "ai-spm", term: "AI-SPM", expansion: "AI Security Posture Management", group: "producto", family: "ai-security",
    definition: "Descubrimiento continuo de modelos, conjuntos de datos y canalizaciones de IA presentes en la organización, con detección de exposiciones y configuraciones inseguras.",
    related: ["ai-governance", "shadow-ai"],
  },
  {
    id: "ai-firewall", term: "Cortafuegos de IA", group: "producto", family: "ai-security",
    definition: "Control situado entre la aplicación y el modelo que inspecciona la petición y la respuesta para bloquear inyección de instrucciones, contenido prohibido o salida de datos sensibles.",
    related: ["llm-security", "llm-gateway", "prompt-injection"],
  },
  {
    id: "llm-security", term: "Seguridad de LLM", group: "producto", family: "ai-security",
    definition: "Disciplina centrada en los riesgos propios de los grandes modelos de lenguaje: inyección de instrucciones, evasión de restricciones, fuga del contexto y consumo no controlado.",
    evaluar: "Referencia habitual: el OWASP Top 10 para aplicaciones LLM.",
    related: ["prompt-injection", "ai-firewall", "owasp-top-10"],
  },
  {
    id: "llm-gateway", term: "Pasarela de LLM", group: "producto", family: "ai-security",
    definition: "Punto único de acceso a los distintos proveedores de modelos que centraliza claves, cuotas, registro de las conversaciones y control de coste.",
    evaluar: "Que registre qué datos salen hacia el proveedor: es la evidencia que pedirá cualquier auditoría de protección de datos.",
    related: ["ai-firewall", "shadow-ai"],
  },
  {
    id: "model-risk", term: "Riesgo de modelo", expansion: "MRM · Model Risk Management", group: "producto", family: "ai-security",
    definition: "Validación independiente y seguimiento continuo del comportamiento de los modelos analíticos y de IA, disciplina procedente del sector financiero y su normativa supervisora.",
    evaluar: "Detección de deriva del modelo y existencia de una validación realizada por alguien distinto de quien lo desarrolló.",
    related: ["ai-governance", "deriva-modelo"],
  },
  {
    id: "ai-data-security", term: "Seguridad del dato en IA", group: "producto", family: "ai-security",
    definition: "Protección de la información utilizada para entrenar o consultar modelos, evitando que datos personales o confidenciales acaben incorporados al modelo o expuestos en sus respuestas.",
    related: ["dlp", "shadow-ai", "rgpd"],
  },

  // ─────────────────────────────────────── NORMATIVA Y CERTIFICACIONES
  {
    id: "iso-27001", term: "ISO/IEC 27001", group: "normativa",
    definition: "Norma internacional certificable que define los requisitos de un sistema de gestión de la seguridad de la información (SGSI). Certifica el sistema de gestión —el ciclo de mejora continua— y no la seguridad de un producto concreto. La versión vigente es la de 2022.",
    evaluar: "Alcance declarado en el certificado: una certificación puede cubrir solo una filial o un servicio. Conviene leer también la Declaración de Aplicabilidad.",
    related: ["soa", "sgsi", "iso-27002", "compliance-management"],
  },
  {
    id: "iso-27002", term: "ISO/IEC 27002", group: "normativa",
    definition: "Guía de buenas prácticas que desarrolla los 93 controles del Anexo A de ISO 27001 explicando cómo implantarlos. No es certificable por sí misma.",
    related: ["iso-27001"],
  },
  {
    id: "iso-27017", term: "ISO/IEC 27017", group: "normativa",
    definition: "Extensión de ISO 27002 con controles específicos para servicios en la nube, dirigida tanto al proveedor como al cliente.",
    related: ["iso-27001", "responsabilidad-compartida"],
  },
  {
    id: "iso-27018", term: "ISO/IEC 27018", group: "normativa",
    definition: "Código de buenas prácticas para la protección de datos personales tratados por un proveedor de nube que actúa como encargado del tratamiento.",
    related: ["rgpd", "iso-27001"],
  },
  {
    id: "iso-27701", term: "ISO/IEC 27701", group: "normativa",
    definition: "Extensión de ISO 27001 hacia un sistema de gestión de la privacidad (SGPI). Es la vía habitual para acreditar diligencia en materia de protección de datos, aunque no sustituye al cumplimiento del RGPD.",
    related: ["rgpd", "iso-27001"],
  },
  {
    id: "iso-22301", term: "ISO 22301", group: "normativa",
    definition: "Norma certificable de sistemas de gestión de la continuidad de negocio: análisis de impacto, estrategias de recuperación, planes y programa de pruebas.",
    related: ["business-continuity", "bia"],
  },
  {
    id: "iso-42001", term: "ISO/IEC 42001", group: "normativa",
    definition: "Primera norma certificable de sistemas de gestión de la inteligencia artificial, publicada en 2023. Cubre la gobernanza del ciclo de vida de los sistemas de IA y su evaluación de impacto.",
    related: ["ai-governance", "ai-act"],
  },
  {
    id: "iso-27005", term: "ISO/IEC 27005", group: "normativa",
    definition: "Directrices para la gestión de riesgos de seguridad de la información, complementarias al enfoque genérico de ISO 31000.",
    related: ["risk-management"],
  },
  {
    id: "iso-9001", term: "ISO 9001", group: "normativa",
    definition: "Norma de sistemas de gestión de la calidad. Aparece a menudo junto a ISO 27001 porque comparte estructura de alto nivel y buena parte del aparato documental.",
  },
  {
    id: "soc-2", term: "SOC 2", expansion: "Service Organization Control 2", group: "normativa",
    definition: "Informe de atestación estadounidense, emitido por un auditor bajo normas del AICPA, sobre los controles de una organización de servicios respecto a cinco criterios: seguridad, disponibilidad, integridad del procesamiento, confidencialidad y privacidad. No es un certificado sino un informe con opinión.",
    evaluar: "Distinguir Tipo I (diseño de los controles en una fecha) de Tipo II (eficacia operativa durante un periodo, normalmente entre seis y doce meses) y revisar las excepciones señaladas.",
    related: ["soc-1", "soc-3", "iso-27001"],
  },
  {
    id: "soc-1", term: "SOC 1", group: "normativa",
    definition: "Informe centrado en los controles del proveedor que afectan a la información financiera de sus clientes. Es el relevante para el auditor de cuentas.",
    related: ["soc-2"],
  },
  {
    id: "soc-3", term: "SOC 3", group: "normativa",
    definition: "Versión resumida y de difusión pública del SOC 2, sin el detalle de las pruebas realizadas. Sirve como material comercial, no como evidencia de auditoría.",
    related: ["soc-2"],
  },
  {
    id: "ens", term: "ENS", expansion: "Esquema Nacional de Seguridad", group: "normativa",
    definition: "Marco obligatorio en España para el sector público y para los proveedores que le prestan servicios, regulado por el Real Decreto 311/2022. Establece categorías Básica, Media y Alta según el impacto de un incidente sobre el servicio.",
    evaluar: "Categoría y alcance de la declaración o certificación de conformidad, y quién la ha emitido.",
    related: ["ccn-stic", "iso-27001"],
  },
  {
    id: "ccn-stic", term: "CCN-STIC", group: "normativa",
    definition: "Serie de guías del Centro Criptológico Nacional que desarrollan cómo implantar los requisitos del ENS y cómo configurar de forma segura tecnologías concretas.",
    related: ["ens"],
  },
  {
    id: "rgpd", term: "RGPD", expansion: "Reglamento General de Protección de Datos", group: "normativa",
    definition: "Reglamento (UE) 2016/679, aplicable desde 2018, que regula el tratamiento de datos personales. Impone principios de licitud y minimización, derechos de las personas, evaluaciones de impacto y notificación de brechas en 72 horas.",
    evaluar: "Registro de actividades de tratamiento, base jurídica de cada tratamiento, contratos con encargados y garantías para las transferencias internacionales.",
    related: ["iso-27701", "dpo", "evaluacion-impacto"],
  },
  {
    id: "nis2", term: "NIS2", group: "normativa",
    definition: "Directiva (UE) 2022/2555 sobre ciberseguridad de sectores esenciales e importantes. Amplía sustancialmente el ámbito de la anterior NIS, exige medidas mínimas de gestión de riesgos, impone plazos cortos de notificación de incidentes y establece responsabilidad de la dirección.",
    evaluar: "Determinar si la entidad está en el ámbito y si la cadena de suministro está cubierta por las medidas exigidas.",
    related: ["dora", "supply-chain"],
  },
  {
    id: "dora", term: "DORA", expansion: "Digital Operational Resilience Act", group: "normativa",
    definition: "Reglamento (UE) 2022/2554 sobre resiliencia operativa digital del sector financiero. Cubre gestión del riesgo TIC, notificación de incidentes graves, pruebas de resiliencia y control de los proveedores tecnológicos críticos.",
    related: ["nis2", "business-continuity", "third-party-security"],
  },
  {
    id: "ai-act", term: "Reglamento Europeo de IA", expansion: "AI Act", group: "normativa",
    definition: "Reglamento (UE) 2024/1689 que clasifica los sistemas de inteligencia artificial por nivel de riesgo —inaceptable, alto, limitado y mínimo— e impone obligaciones proporcionales, con aplicación escalonada desde 2025.",
    evaluar: "Clasificación del uso concreto: la mayoría de obligaciones exigentes recaen sobre los sistemas de alto riesgo.",
    related: ["ai-governance", "iso-42001"],
  },
  {
    id: "pci-dss", term: "PCI DSS", expansion: "Payment Card Industry Data Security Standard", group: "normativa",
    definition: "Estándar del sector de medios de pago aplicable a quien almacena, procesa o transmite datos de tarjeta. La versión 4.0 endurece los requisitos de autenticación y de seguridad en aplicaciones web.",
    evaluar: "Delimitación del entorno afectado: reducir el alcance mediante segmentación es la medida que más simplifica el cumplimiento.",
    related: ["segmentacion"],
  },
  {
    id: "hipaa", term: "HIPAA", group: "normativa",
    definition: "Legislación estadounidense sobre la protección de la información sanitaria identificable. Su Security Rule fija las salvaguardas administrativas, físicas y técnicas exigibles.",
  },
  {
    id: "fedramp", term: "FedRAMP", group: "normativa",
    definition: "Programa estadounidense de autorización de servicios cloud para uso de agencias federales, con niveles Low, Moderate y High. Es una de las acreditaciones más costosas de obtener y funciona como señal de madurez.",
  },
  {
    id: "csa-star", term: "CSA STAR", group: "normativa",
    definition: "Registro de la Cloud Security Alliance basado en la matriz de controles CCM. Nivel 1 es autoevaluación publicada; Nivel 2 implica certificación o atestación por un tercero.",
    evaluar: "Distinguir el nivel: una entrada de Nivel 1 es una declaración del propio proveedor.",
    related: ["iso-27017"],
  },
  {
    id: "common-criteria", term: "Common Criteria", expansion: "ISO/IEC 15408", group: "normativa",
    definition: "Marco internacional de evaluación de la seguridad de productos de TI. El resultado se expresa como nivel de garantía EAL1 a EAL7 respecto a un perfil de protección determinado.",
    evaluar: "El EAL indica el rigor de la evaluación, no cuán seguro es el producto; hay que leer qué configuración concreta se evaluó.",
    related: ["fips-140"],
  },
  {
    id: "fips-140", term: "FIPS 140-2 / 140-3", group: "normativa",
    definition: "Estándar estadounidense de validación de módulos criptográficos, con niveles 1 a 4 de resistencia física y lógica. FIPS 140-3 sustituye progresivamente a 140-2.",
    evaluar: "La validación cubre el módulo criptográfico, no el producto entero, y solo cuando opera en el modo aprobado.",
    related: ["hsm", "common-criteria"],
  },
  {
    id: "eidas", term: "eIDAS", group: "normativa",
    definition: "Reglamento europeo de identificación electrónica y servicios de confianza. Distingue firma simple, avanzada y cualificada, y solo esta última equivale legalmente a la firma manuscrita en toda la Unión.",
    related: ["eidas-trust", "firma-cualificada"],
  },
  {
    id: "cis-controls", term: "CIS Controls", group: "normativa",
    definition: "Conjunto priorizado de 18 controles de seguridad publicado por el Center for Internet Security, organizado en tres grupos de implantación según el tamaño y la madurez de la organización.",
    related: ["cis-benchmarks", "nist-csf"],
  },
  {
    id: "nist-csf", term: "NIST CSF", expansion: "Cybersecurity Framework", group: "normativa",
    definition: "Marco de referencia estadounidense estructurado en funciones —Gobernar, Identificar, Proteger, Detectar, Responder y Recuperar— desde su versión 2.0. Es un marco voluntario muy usado para medir madurez.",
    related: ["cis-controls", "iso-27001"],
  },
  {
    id: "cis-benchmarks", term: "CIS Benchmarks", group: "normativa",
    definition: "Guías de configuración segura, muy detalladas, para sistemas operativos, bases de datos, navegadores y servicios cloud concretos.",
    related: ["cis-controls", "hardening"],
  },
  {
    id: "webtrust", term: "WebTrust", group: "normativa",
    definition: "Programa de auditoría específico para autoridades de certificación. Superarlo es requisito para que los navegadores incluyan la CA en su almacén de confianza.",
    related: ["pki", "cert-managers"],
  },
  {
    id: "irap", term: "IRAP", group: "normativa",
    definition: "Programa australiano de evaluación de la seguridad de proveedores TIC frente al marco ISM del gobierno de Australia.",
  },
  {
    id: "c5", term: "C5", expansion: "Cloud Computing Compliance Criteria Catalogue", group: "normativa",
    definition: "Catálogo alemán, publicado por la BSI, de criterios mínimos de seguridad para servicios en la nube. Se acredita mediante informe de auditoría.",
  },
  {
    id: "cyber-essentials", term: "Cyber Essentials", group: "normativa",
    definition: "Esquema británico de certificación en cinco controles técnicos básicos. Su versión Plus añade verificación técnica independiente.",
  },
  {
    id: "owasp-top-10", term: "OWASP Top 10", group: "normativa",
    definition: "Lista de referencia de los diez riesgos más críticos en aplicaciones web, mantenida por la fundación OWASP. Existen variantes específicas para API y para aplicaciones basadas en LLM.",
    related: ["waf", "api-security", "llm-security"],
  },

  // ─────────────────────────────────────── CONCEPTOS TRANSVERSALES
  {
    id: "sgsi", term: "SGSI", expansion: "Sistema de Gestión de la Seguridad de la Información", group: "concepto",
    definition: "Conjunto de políticas, procesos y responsabilidades con que una organización gestiona la seguridad de su información de forma sistemática y bajo un ciclo de mejora continua. Es el objeto que certifica ISO 27001.",
    related: ["iso-27001", "soa"],
  },
  {
    id: "soa", term: "Declaración de Aplicabilidad", expansion: "SoA · Statement of Applicability", group: "concepto",
    definition: "Documento que enumera todos los controles del Anexo A de ISO 27001 indicando cuáles se aplican, cuáles se excluyen y por qué. Es la primera pieza que revisa un auditor y la que revela el alcance real del sistema.",
    related: ["iso-27001", "sgsi"],
  },
  {
    id: "riesgo-residual", term: "Riesgo residual", group: "concepto",
    definition: "Riesgo que permanece después de aplicar los controles previstos. Debe ser aceptado formalmente por quien tiene autoridad para asumirlo.",
    related: ["risk-management", "apetito-riesgo"],
  },
  {
    id: "apetito-riesgo", term: "Apetito de riesgo", group: "concepto",
    definition: "Nivel de riesgo que la dirección declara estar dispuesta a asumir en la consecución de sus objetivos. Sin él, la valoración de riesgos carece de criterio para decidir qué se trata y qué se acepta.",
    related: ["risk-management", "riesgo-residual"],
  },
  {
    id: "no-conformidad", term: "No conformidad", group: "concepto",
    definition: "Incumplimiento de un requisito detectado en una auditoría. Se clasifica como mayor cuando compromete la eficacia del sistema y menor cuando es un fallo puntual; la mayor impide o suspende la certificación.",
    related: ["audit-management"],
  },
  {
    id: "rpo", term: "RPO", expansion: "Recovery Point Objective", group: "concepto",
    definition: "Cantidad máxima de datos, medida en tiempo, que la organización acepta perder ante un incidente. Determina cada cuánto debe hacerse la copia.",
    related: ["rto", "enterprise-backup", "bia"],
  },
  {
    id: "rto", term: "RTO", expansion: "Recovery Time Objective", group: "concepto",
    definition: "Plazo máximo admisible para restablecer un servicio tras una interrupción. Determina la arquitectura de recuperación necesaria y, con ella, su coste.",
    related: ["rpo", "business-continuity", "drp"],
  },
  {
    id: "bia", term: "BIA", expansion: "Business Impact Analysis", group: "concepto",
    definition: "Análisis que identifica los procesos críticos, cuantifica el impacto de su interrupción a lo largo del tiempo y de ahí deriva los objetivos RTO y RPO. Es el punto de partida de cualquier plan de continuidad.",
    related: ["business-continuity", "rto", "rpo"],
  },
  {
    id: "drp", term: "Plan de recuperación ante desastres", expansion: "DRP · Disaster Recovery Plan", group: "concepto",
    definition: "Procedimiento técnico documentado para restablecer la infraestructura tras un desastre. Es el componente tecnológico del plan de continuidad, no su equivalente.",
    related: ["business-continuity", "rto"],
  },
  {
    id: "regla-321", term: "Regla 3-2-1", group: "concepto",
    definition: "Criterio clásico de respaldo: tres copias del dato, en dos soportes distintos, con una de ellas fuera de las instalaciones. Su versión moderna añade una copia inmutable o desconectada y una verificación sin errores.",
    related: ["enterprise-backup", "immutable-backup", "air-gap"],
  },
  {
    id: "air-gap", term: "Air gap", group: "concepto",
    definition: "Aislamiento físico o lógico de una copia respecto a la red de producción, de forma que un atacante con control del entorno no pueda alcanzarla.",
    related: ["immutable-backup", "ransomware"],
  },
  {
    id: "zero-trust", term: "Zero Trust", group: "concepto",
    definition: "Modelo de arquitectura que elimina la confianza implícita asociada a la ubicación en la red: cada petición se autentica, se autoriza y se cifra, con el mínimo privilegio y verificación continua del contexto.",
    evaluar: "Es una arquitectura, no un producto. Ningún fabricante puede venderla completa, aunque muchos lo enuncien así.",
    related: ["nac", "mfa", "segmentacion", "sase"],
  },
  {
    id: "segmentacion", term: "Segmentación", group: "concepto",
    definition: "División de la red en zonas con control del tráfico entre ellas, de modo que el compromiso de un equipo no permita alcanzar el resto. La microsegmentación lleva el mismo principio hasta la carga de trabajo individual.",
    related: ["zero-trust", "firewall", "pci-dss"],
  },
  {
    id: "sase", term: "SASE", expansion: "Secure Access Service Edge", group: "concepto",
    definition: "Modelo que integra conectividad de red y controles de seguridad como servicio en la nube —SWG, CASB, acceso remoto de confianza cero y cortafuegos— aplicados en el punto más próximo al usuario.",
    related: ["swg", "sd-wan", "zero-trust", "casb"],
  },
  {
    id: "casb", term: "CASB", expansion: "Cloud Access Security Broker", group: "concepto",
    definition: "Intermediario entre el usuario y las aplicaciones cloud que aporta visibilidad del uso, control de acceso, protección del dato y detección de servicios no autorizados.",
    related: ["swg", "shadow-it", "sase"],
  },
  {
    id: "xdr", term: "XDR", expansion: "Extended Detection and Response", group: "concepto",
    definition: "Correlación de la detección a través de varias capas —endpoint, red, correo, identidad y nube— dentro de una misma plataforma, con el objetivo de reducir el número de alertas aisladas.",
    evaluar: "Distinguir el XDR nativo, limitado a productos de un mismo fabricante, del abierto, que integra fuentes de terceros.",
    related: ["edr", "ndr", "siem"],
  },
  {
    id: "mdr", term: "MDR", expansion: "Managed Detection and Response", group: "concepto",
    definition: "Servicio gestionado en el que un tercero opera la detección y la respuesta con personal propio las veinticuatro horas. Es la alternativa habitual para organizaciones sin SOC interno.",
    evaluar: "Alcance de la respuesta contratada: si el proveedor puede actuar o solo notificar, y con qué tiempos comprometidos.",
    related: ["edr", "soc"],
  },
  {
    id: "soc", term: "SOC", expansion: "Security Operations Center", group: "concepto",
    definition: "Equipo y función responsables de vigilar, detectar y responder a incidentes de seguridad de forma continua. No debe confundirse con el informe de auditoría SOC 2, que comparte siglas por casualidad.",
    related: ["siem", "soar", "mdr", "soc-2"],
  },
  {
    id: "epp", term: "EPP", expansion: "Endpoint Protection Platform", group: "concepto",
    definition: "Denominación de mercado para la plataforma de protección del puesto que agrupa antivirus, cortafuegos local, control de dispositivos y cifrado. El EDR es su capa de detección e investigación.",
    related: ["antivirus", "edr"],
  },
  {
    id: "hids", term: "HIDS / NIDS", group: "concepto",
    definition: "Distinción entre detección de intrusiones basada en host —que observa ficheros, procesos y registros del sistema— y basada en red, que inspecciona el tráfico.",
    related: ["ids"],
  },
  {
    id: "ransomware", term: "Ransomware", group: "concepto",
    definition: "Ataque que cifra la información de la víctima y exige un rescate. La modalidad de doble extorsión añade la exfiltración previa de los datos y la amenaza de publicarlos, lo que hace que disponer de copias no elimine el impacto.",
    related: ["immutable-backup", "ransomware-recovery", "air-gap"],
  },
  {
    id: "phishing", term: "Phishing", group: "concepto",
    definition: "Suplantación de un remitente de confianza para inducir a la víctima a entregar credenciales o ejecutar una acción. El spear phishing es su variante dirigida a una persona concreta con información previa.",
    related: ["email-security", "security-awareness", "bec"],
  },
  {
    id: "bec", term: "BEC", expansion: "Business Email Compromise", group: "concepto",
    definition: "Fraude en el que el atacante se hace pasar por un directivo o un proveedor para conseguir una transferencia o un cambio de cuenta bancaria. Su impacto económico supera al del ransomware y no requiere malware.",
    related: ["phishing", "email-security"],
  },
  {
    id: "dns-tunneling", term: "Túnel DNS", group: "concepto",
    definition: "Técnica de exfiltración que codifica los datos dentro de consultas DNS para sacarlos de la red aprovechando que ese tráfico suele estar permitido y poco inspeccionado.",
    related: ["dns-security"],
  },
  {
    id: "supply-chain", term: "Cadena de suministro", group: "concepto",
    definition: "Vector de ataque que compromete a un proveedor, una dependencia de software o una actualización legítima para alcanzar por esa vía a sus clientes.",
    related: ["sbom", "third-party-security", "nis2"],
  },
  {
    id: "sbom", term: "SBOM", expansion: "Software Bill of Materials", group: "concepto",
    definition: "Inventario legible por máquina de todos los componentes y dependencias que integran una pieza de software. Permite responder en horas, y no en semanas, a la pregunta de si se está afectado por una vulnerabilidad concreta.",
    related: ["supply-chain", "sca", "ci-cd"],
  },
  {
    id: "cve", term: "CVE", expansion: "Common Vulnerabilities and Exposures", group: "concepto",
    definition: "Identificador único y público de una vulnerabilidad concreta, con el formato CVE-año-número. Es el lenguaje común para referirse a un fallo sin ambigüedad.",
    related: ["cvss", "kev"],
  },
  {
    id: "cvss", term: "CVSS", expansion: "Common Vulnerability Scoring System", group: "concepto",
    definition: "Sistema de puntuación de la gravedad de una vulnerabilidad de 0 a 10. Mide severidad técnica, no riesgo: la prioridad real depende de la exposición del activo y de si existe explotación conocida.",
    related: ["cve", "kev", "epss"],
  },
  {
    id: "kev", term: "KEV", expansion: "Known Exploited Vulnerabilities", group: "concepto",
    definition: "Catálogo publicado por la agencia estadounidense CISA con las vulnerabilidades que se están explotando de forma confirmada. Es el mejor criterio disponible para priorizar el parcheo.",
    related: ["cve", "cvss"],
  },
  {
    id: "epss", term: "EPSS", expansion: "Exploit Prediction Scoring System", group: "concepto",
    definition: "Puntuación probabilística de que una vulnerabilidad sea explotada en los próximos treinta días. Complementa a CVSS aportando la dimensión de probabilidad.",
    related: ["cvss", "kev"],
  },
  {
    id: "mitre-attack", term: "MITRE ATT&CK", group: "concepto",
    definition: "Base de conocimiento que clasifica las tácticas y técnicas observadas en ataques reales. Se usa para medir la cobertura de detección de una organización y para describir incidentes con un vocabulario común.",
    related: ["soc", "siem"],
  },
  {
    id: "ioc", term: "IoC", expansion: "Indicator of Compromise", group: "concepto",
    definition: "Dato observable que evidencia una intrusión: un hash, un dominio, una dirección IP o una clave de registro. Los indicadores caducan rápido, de ahí el desplazamiento del sector hacia la detección por comportamiento.",
    related: ["siem", "mitre-attack"],
  },
  {
    id: "hardening", term: "Bastionado", expansion: "Hardening", group: "concepto",
    definition: "Reducción de la superficie de ataque de un sistema desactivando servicios innecesarios, ajustando su configuración a una guía de referencia y eliminando credenciales por defecto.",
    related: ["cis-benchmarks", "ccn-stic"],
  },
  {
    id: "shadow-it", term: "Shadow IT", group: "concepto",
    definition: "Servicios y aplicaciones utilizados por los empleados sin conocimiento ni aprobación del departamento de TI, con el consiguiente dato corporativo fuera de todo control.",
    related: ["casb", "shadow-ai"],
  },
  {
    id: "shadow-ai", term: "Shadow AI", group: "concepto",
    definition: "Variante actual del anterior: uso de herramientas de inteligencia artificial no autorizadas, con el riesgo añadido de que la información introducida en el prompt salga de la organización.",
    related: ["shadow-it", "llm-gateway", "ai-data-security"],
  },
  {
    id: "byod", term: "BYOD", expansion: "Bring Your Own Device", group: "concepto",
    definition: "Política que permite el uso de dispositivos personales para el trabajo. Exige separar el dato corporativo del personal y acordar por escrito el alcance del control que ejerce la empresa.",
    related: ["mdm", "mam"],
  },
  {
    id: "iac", term: "IaC", expansion: "Infrastructure as Code", group: "concepto",
    definition: "Definición de la infraestructura mediante ficheros versionados que se aplican de forma automática, lo que la hace reproducible, revisable y auditable como cualquier otro código.",
    related: ["config-managers", "ci-cd"],
  },
  {
    id: "sast", term: "SAST / DAST / SCA", group: "concepto",
    definition: "Las tres formas de analizar la seguridad del software: estática sobre el código fuente (SAST), dinámica contra la aplicación en ejecución (DAST) y de composición sobre las dependencias de terceros (SCA).",
    related: ["code-quality", "sbom"],
  },
  {
    id: "dast", term: "DAST", expansion: "Dynamic Application Security Testing", group: "concepto",
    definition: "Prueba de seguridad ejecutada contra la aplicación en funcionamiento, sin acceso al código, imitando el comportamiento de un atacante externo.",
    related: ["sast", "code-quality"],
  },
  {
    id: "sca", term: "SCA", expansion: "Software Composition Analysis", group: "concepto",
    definition: "Identificación de las bibliotecas de terceros incorporadas al proyecto y de las vulnerabilidades y licencias asociadas a cada una.",
    related: ["sbom", "sast"],
  },
  {
    id: "pki", term: "PKI", expansion: "Public Key Infrastructure", group: "concepto",
    definition: "Conjunto de autoridades, políticas y procedimientos que emiten y validan certificados digitales, estableciendo una cadena de confianza desde una raíz hasta el certificado final.",
    related: ["x509", "cert-managers", "webtrust"],
  },
  {
    id: "x509", term: "Certificado X.509", group: "concepto",
    definition: "Formato estándar del certificado digital que vincula una clave pública con una identidad y va firmado por una autoridad de certificación.",
    related: ["pki", "cert-managers"],
  },
  {
    id: "hsm", term: "HSM", expansion: "Hardware Security Module", group: "concepto",
    definition: "Dispositivo criptográfico resistente a manipulación que genera y custodia claves sin que estas lleguen a salir de él en claro. Es requisito para la firma cualificada y para buena parte de la normativa de medios de pago.",
    related: ["key-managers", "fips-140"],
  },
  {
    id: "firma-cualificada", term: "Firma electrónica cualificada", group: "concepto",
    definition: "Firma avanzada creada con un dispositivo cualificado y basada en un certificado cualificado. Es la única que eIDAS equipara legalmente a la firma manuscrita.",
    related: ["eidas", "eidas-trust", "hsm"],
  },
  {
    id: "no-repudio", term: "No repudio", group: "concepto",
    definition: "Garantía de que quien realizó una acción no pueda negarla después, sostenida habitualmente en firma electrónica, sellado de tiempo y registros íntegros.",
    related: ["timestamping", "firma-cualificada"],
  },
  {
    id: "saml", term: "SAML", expansion: "Security Assertion Markup Language", group: "concepto",
    definition: "Estándar basado en XML para intercambiar aserciones de autenticación entre un proveedor de identidad y un proveedor de servicio. Es la base del SSO empresarial clásico.",
    related: ["sso", "oidc"],
  },
  {
    id: "oidc", term: "OAuth 2.0 / OIDC", group: "concepto",
    definition: "OAuth 2.0 delega la autorización de acceso a un recurso; OpenID Connect añade sobre él la capa de autenticación. Es el par predominante en aplicaciones modernas y móviles.",
    related: ["sso", "saml"],
  },
  {
    id: "fido2", term: "FIDO2 / Passkeys", group: "concepto",
    definition: "Estándar de autenticación con criptografía de clave pública en el que la credencial está ligada al dominio, lo que la hace resistente al phishing. Las passkeys son su presentación al usuario final, sin contraseña.",
    related: ["mfa", "phishing"],
  },
  {
    id: "just-in-time", term: "Acceso justo a tiempo", expansion: "JIT", group: "concepto",
    definition: "Concesión del privilegio solo durante el intervalo necesario para ejecutar una tarea, tras el cual se revoca automáticamente. Elimina los administradores permanentes.",
    related: ["pam", "zero-trust"],
  },
  {
    id: "iga", term: "IGA", expansion: "Identity Governance and Administration", group: "concepto",
    definition: "Capa de gobierno sobre la gestión de identidades: modelo de roles, campañas de recertificación de accesos y control de la segregación de funciones.",
    related: ["identity-managers", "sod"],
  },
  {
    id: "sod", term: "Segregación de funciones", expansion: "SoD", group: "concepto",
    definition: "Principio de control interno que impide que una misma persona acumule permisos incompatibles, como registrar un proveedor y aprobar su pago.",
    related: ["iga"],
  },
  {
    id: "insider-risk", term: "Riesgo interno", expansion: "Insider Risk", group: "concepto",
    definition: "Amenaza procedente de personas con acceso legítimo, ya sea por intención maliciosa, por negligencia o por tener sus credenciales comprometidas.",
    related: ["dlp", "pam"],
  },
  {
    id: "clasificacion-dato", term: "Clasificación de la información", group: "concepto",
    definition: "Asignación de un nivel de sensibilidad a cada conjunto de datos —pública, interna, confidencial, restringida— del que se derivan los controles aplicables. Sin ella, ningún DLP funciona bien.",
    related: ["dlp", "iso-27001"],
  },
  {
    id: "responsabilidad-compartida", term: "Responsabilidad compartida", group: "concepto",
    definition: "Reparto de obligaciones de seguridad entre el proveedor cloud y su cliente. El proveedor responde de la seguridad *de* la nube; el cliente, de la seguridad *en* la nube: sus datos, sus identidades y su configuración.",
    related: ["saas-backup", "iso-27017"],
  },
  {
    id: "soberania-dato", term: "Soberanía del dato", group: "concepto",
    definition: "Sujeción del dato a la legislación del territorio en que se almacena o desde el que se accede. Determina la elección de región cloud y las garantías exigibles en transferencias internacionales.",
    related: ["rgpd", "cloud-backup"],
  },
  {
    id: "observabilidad", term: "Observabilidad", group: "concepto",
    definition: "Capacidad de deducir el estado interno de un sistema a partir de lo que emite: métricas, registros y trazas. Se distingue de la monitorización clásica en que permite responder preguntas no previstas de antemano.",
    related: ["log-management", "server-monitoring"],
  },
  {
    id: "sla", term: "SLA / SLO / SLI", group: "concepto",
    definition: "El acuerdo de nivel de servicio es el compromiso contractual; el objetivo (SLO) es la meta interna, habitualmente más exigente; y el indicador (SLI) es la medida concreta con la que se comprueba.",
    related: ["incident-management", "observabilidad"],
  },
  {
    id: "itil", term: "ITIL", group: "concepto",
    definition: "Marco de buenas prácticas para la gestión de servicios de TI. Su versión 4 abandona el enfoque de procesos encadenados en favor de un sistema de valor con prácticas y principios rectores.",
    related: ["incident-management", "change-management"],
  },
  {
    id: "cmdb", term: "CMDB", expansion: "Configuration Management Database", group: "concepto",
    definition: "Repositorio de los elementos de configuración y, sobre todo, de sus relaciones de dependencia. Su valor está en poder anticipar qué servicios caen si falla un componente concreto.",
    evaluar: "Grado de actualización: una CMDB desfasada induce a decisiones equivocadas y es peor que no tenerla.",
    related: ["it-asset-managers", "itil"],
  },
  {
    id: "sam", term: "SAM", expansion: "Software Asset Management", group: "concepto",
    definition: "Rama del ITAM centrada en las licencias de software: derechos adquiridos frente a uso real, con el fin de evitar tanto el incumplimiento como el sobrecoste por licencias ociosas.",
    related: ["it-asset-managers"],
  },
  {
    id: "dpo", term: "Delegado de Protección de Datos", expansion: "DPO", group: "concepto",
    definition: "Figura exigida por el RGPD en determinados supuestos, encargada de supervisar el cumplimiento en materia de datos personales. Debe actuar con independencia y reportar al máximo nivel.",
    related: ["rgpd", "evaluacion-impacto"],
  },
  {
    id: "evaluacion-impacto", term: "Evaluación de impacto", expansion: "EIPD · DPIA", group: "concepto",
    definition: "Análisis previo obligatorio cuando un tratamiento entraña un alto riesgo para los derechos de las personas. Documenta el riesgo y las medidas adoptadas para mitigarlo.",
    related: ["rgpd", "dpo"],
  },
  {
    id: "due-diligence", term: "Debida diligencia", group: "concepto",
    definition: "Verificación previa de la solvencia y las prácticas de seguridad de un tercero antes de contratarlo, y su repetición periódica mientras dure la relación.",
    related: ["third-party-security"],
  },
  {
    id: "deriva-modelo", term: "Deriva del modelo", expansion: "Model Drift", group: "concepto",
    definition: "Degradación progresiva del rendimiento de un modelo de aprendizaje automático a medida que los datos reales se alejan de los usados para entrenarlo. Obliga a un seguimiento continuo, no a una validación única.",
    related: ["model-risk", "ai-governance"],
  },
  {
    id: "prompt-injection", term: "Inyección de instrucciones", expansion: "Prompt Injection", group: "concepto",
    definition: "Ataque que introduce instrucciones en la entrada de un modelo de lenguaje para que ignore sus directrices. En su variante indirecta las instrucciones viajan ocultas en un documento o una página web que el modelo procesa.",
    related: ["llm-security", "ai-firewall"],
  },
  {
    id: "uem", term: "UEM", expansion: "Unified Endpoint Management", group: "concepto",
    definition: "Administración desde una única consola de todo tipo de dispositivo —ordenadores, móviles, tabletas y quioscos—, resultado de la convergencia entre la gestión clásica del puesto y el MDM.",
    related: ["mdm", "mam"],
  },
];
