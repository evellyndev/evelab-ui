import { memo, useMemo } from 'react'
import dagre from '@dagrejs/dagre'
import { Background, Handle, Position, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './hallucination-decision-tree.css'

const NODE_WIDTH = 172
const NODE_HEIGHT = 64
const shown = value => (value || '').replaceAll(' ', '␠').replaceAll('\t', '⇥').replaceAll('\n', '↵') || '∅'
const pct = value => new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 1 }).format(value)

const DecisionNode = memo(({ data }) => <div className={'decision-node' + (data.selected ? ' is-selected' : '') + (data.root ? ' is-root' : '')}>
  <Handle className="decision-handle" position={Position.Left} type="target" />
  <strong>{data.label}</strong>
  {data.probability != null && <small>{pct(data.probability)}</small>}
  <Handle className="decision-handle" position={Position.Right} type="source" />
</div>)

const nodeTypes = { decision: DecisionNode }

function activePath(nodes, active) {
  const path = []
  let current = nodes[active]
  while (current) {
    path.unshift(current)
    current = current.parentId ? nodes[current.parentId] : null
  }
  return path
}

function layout(nodes, edges) {
  const graph = new dagre.graphlib.Graph()
  graph.setDefaultEdgeLabel(() => ({}))
  graph.setGraph({ rankdir: 'LR', nodesep: 22, ranksep: 94, marginx: 26, marginy: 34 })
  nodes.forEach(node => graph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT }))
  edges.forEach(edge => graph.setEdge(edge.source, edge.target))
  dagre.layout(graph)
  return nodes.map(node => {
    const point = graph.node(node.id)
    return { ...node, position: { x: point.x - NODE_WIDTH / 2, y: point.y - NODE_HEIGHT / 2 } }
  })
}

function graphForPath(nodes, active, premise) {
  if (!nodes.root || !active) return { nodes: [], edges: [] }
  const path = activePath(nodes, active)
  const flowNodes = [{ id: 'root', type: 'decision', data: { label: premise, root: true }, position: { x: 0, y: 0 } }]
  const edges = []
  let previous = 'root'

  path.forEach((node, depth) => {
    const decision = node.segment?.[node.index]
    if (!decision) return
    const selected = path[depth + 1]?.token
    let selectedId = null
    decision.top_logprobs.forEach((candidate, index) => {
      const id = 'candidate-' + node.id + '-' + index
      const isSelected = candidate.token === selected
      if (isSelected) selectedId = id
      flowNodes.push({ id, type: 'decision', data: { label: shown(candidate.token), probability: candidate.probability, selected: isSelected }, position: { x: 0, y: 0 } })
      edges.push({ id: previous + '-' + id, source: previous, target: id, type: 'bezier', className: isSelected ? 'decision-edge is-selected' : 'decision-edge' })
    })
    if (selectedId) previous = selectedId
  })
  return { nodes: layout(flowNodes, edges), edges }
}

export default function HallucinationDecisionTree({ active, nodes, premise }) {
  const graph = useMemo(() => graphForPath(nodes, active, premise), [active, nodes, premise])
  if (!nodes.root) return <p className="tree-empty">Inicie com uma afirmação para observar as decisões.</p>
  return <div className="decision-tree" aria-label="Histórico da geração">
    <ReactFlow edges={graph.edges} elementsSelectable={false} fitView fitViewOptions={{ padding: .18 }} maxZoom={1.2} minZoom={.35} nodes={graph.nodes} nodeTypes={nodeTypes} nodesConnectable={false} nodesDraggable={false} panOnDrag>
      <Background color="rgba(167,139,250,.12)" gap={18} size={1} />
    </ReactFlow>
  </div>
}
