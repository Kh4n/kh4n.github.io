package main

import (
	"fmt"
	_ "image/png"
	"log"
	"slices"
	"syscall/js"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
	"github.com/hajimehoshi/ebiten/v2/inpututil"
)

func In(px, py, x, y, w, h int) bool {
	return x <= px && px <= x + w && y <= py && py <= y + h
}

func Lerp(a, b int, f float32) int {
	return int(float32(b-a)*f + float32(a))
}

const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

type CardContainer interface {
	Add(c *Card)
	Remove(c *Card)
}

const CARD_AREA_LERP_FAC = 0.25
type CardArea struct {
	x,y, w,h int
	maxGap int
	padding int
	cards []*Card
}
func MakeCardArea(x,y, w,h, maxGap int, padding int) CardArea {
	return CardArea{
		x: x, y: y, w: w, h: h,
		maxGap: maxGap,
		padding: padding,
		cards: make([]*Card, 0),
	}
}

func (ca *CardArea) Add(c *Card) {
	ca.cards = append(ca.cards, c)
}
func (ca *CardArea) Remove(c *Card) {
	rem := -1
	for i, card := range ca.cards {
		if card == c {
			rem = i
			break
		}
	}
	if rem != -1 {
		ca.cards = slices.Delete(ca.cards, rem, rem+1)
	}
}

func (ca *CardArea) Update() {
	totalWidth := 0
	for _, c := range ca.cards {
		if c.state == CARD_DRAGGING {
			continue
		}
		totalWidth += c.w
	}
	gapSize := min(ca.maxGap, (ca.w - totalWidth)/len(ca.cards))
	sx, sy := ca.x + ca.padding, ca.y + ca.padding
	for _, c := range ca.cards {
		if c.state == CARD_DRAGGING {
			c.Update()
			continue
		}
		c.x, c.y = Lerp(c.x, sx + c.w/2, CARD_AREA_LERP_FAC), Lerp(c.y, sy + c.h/2, CARD_AREA_LERP_FAC)
		c.Update()
		sx += c.w + gapSize
	}
}
func (ca *CardArea) Draw(screen *ebiten.Image) {
	for i := range ca.cards {
		ca.cards[i].Draw(screen)
	}
}

type FreeArea struct {
	cards []*Card
}
func (ca *FreeArea) Add(c *Card) {
	ca.cards = append(ca.cards, c)
}
func (ca *FreeArea) Remove(c *Card) {
	rem := -1
	for i, card := range ca.cards {
		if card == c {
			rem = i
			break
		}
	}
	if rem != -1 {
		ca.cards = slices.Delete(ca.cards, rem, rem+1)
	}
}


// const CARD_WIDTH = 125
// const CARD_HEIGHT = 175
// const CARD_WIDTH = 100
// const CARD_HEIGHT = 140

const CARD_WIDTH = 95
const CARD_HEIGHT = 126
const CARD_DRAG_FAC = 0.5

type CardState int
const (
	CARD_DROPPED CardState = iota
	CARD_HOVERED CardState = iota
	CARD_DRAGGING CardState = iota
)
type Card struct {
	img *ebiten.Image
	state CardState
	x,y, w,h int
	scale float64

	// container *CardArea

	// name string
	// cost int
	// source string
	// cardType string
	// subtype string
	// speed int
	// offense int
	// defense int
	// rulesText string
	// flavorText string
}

func MakeCard(img *ebiten.Image) *Card {
	c := Card{img: img}
	w,h := c.img.Bounds().Dx(), c.img.Bounds().Dy()
	if w > h {
		c.scale = float64(CARD_WIDTH)/float64(w)
	} else {
		c.scale = float64(CARD_HEIGHT)/float64(h)
	}
	c.w = int(c.scale * float64(c.img.Bounds().Dx()))
	c.h = int(c.scale * float64(c.img.Bounds().Dy()))
	return &c
}


func (c *Card) Update() {
	switch (c.state) {
	case CARD_DROPPED: c.UpdateDrop()
	case CARD_HOVERED: c.UpdateHover()
	case CARD_DRAGGING: c.UpdateDrag()
	}
}
func (c *Card) UpdateDrop() {
	mx, my := ebiten.CursorPosition()
	if In(mx, my, c.x-c.w/2, c.y-c.h/2, c.w, c.h) {
		c.state = CARD_HOVERED
		if inpututil.IsMouseButtonJustPressed(ebiten.MouseButton0) {
			c.state = CARD_DRAGGING
		}
	} else {
		c.state = CARD_DROPPED
	}
}
func (c *Card) UpdateHover() {
	c.UpdateDrop()
}
func (c *Card) UpdateDrag() {
	mx, my := ebiten.CursorPosition()
	c.x, c.y = Lerp(c.x, mx, CARD_DRAG_FAC), Lerp(c.y, my, CARD_DRAG_FAC)
	if inpututil.IsMouseButtonJustReleased(ebiten.MouseButton0) {
		c.state = CARD_HOVERED
		c.x, c.y = mx, my
	}
}

func (c *Card) Draw(screen *ebiten.Image) {
	switch (c.state) {
	case CARD_DROPPED: c.DrawDrop(screen)
	case CARD_HOVERED: c.DrawHover(screen)
	case CARD_DRAGGING: c.DrawDrag(screen)
	}
}
func (c *Card) DrawDrop(screen *ebiten.Image) {
	op := &ebiten.DrawImageOptions{}
	op.GeoM.Scale(c.scale, c.scale)
	op.GeoM.Translate(float64(-c.w/2), float64(-c.h/2))
	op.GeoM.Translate(float64(c.x), float64(c.y))
	op.Filter = ebiten.FilterLinear
	screen.DrawImage(c.img, op)
}
func (c *Card) DrawHover(screen *ebiten.Image) {
	op := &ebiten.DrawImageOptions{}
	op.GeoM.Scale(c.scale, c.scale)
	op.GeoM.Translate(float64(-c.w/2), float64(-c.h/2))
	op.GeoM.Scale(1.05, 1.05)
	op.GeoM.Translate(float64(c.x), float64(c.y))
	op.Filter = ebiten.FilterLinear
	screen.DrawImage(c.img, op)
}
func (c *Card) DrawDrag(screen *ebiten.Image) {
	c.DrawDrop(screen)
}

func init() {
	peer := js.Global().Get("Peer").New()
	log.Println("Peer", peer)
}

type Game struct{
	cardArea CardArea
	freeArea FreeArea

	tableTop *ebiten.Image
}

func (g *Game) Update() error {
	g.cardArea.Update()
	for _, c := range g.freeArea.cards {
		c.Update()
	}
	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	screen.DrawImage(g.tableTop, nil)
	g.cardArea.Draw(screen)
	for _, c := range g.freeArea.cards {
		c.Draw(screen)
	}
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (screenWidth, screenHeight int) {
	return SCREEN_WIDTH, SCREEN_HEIGHT
}

func main() {
	ebiten.SetWindowSize(SCREEN_WIDTH, SCREEN_HEIGHT)
	ebiten.SetWindowTitle("Render an image")
	ebiten.SetTPS(144)

	img, err := ebitenutil.NewImageFromURL("./img/cards/Airshaper.png")
	if err != nil {
		log.Fatal(err)
	}
	c := MakeCard(img)
	ca := MakeCardArea(50, 50, CARD_WIDTH * 5 + 50, CARD_HEIGHT + 10, 10, 20)
	ca.cards = append(ca.cards, c, MakeCard(img), MakeCard(img))//, MakeCard(img), MakeCard(img), MakeCard(img))

	// tableTop, err := ebitenutil.NewImageFromURL("./img/assets/tabletop.png")
	tableTop, err := ebitenutil.NewImageFromURL("./img/assets/Board_Online_v2_Larger_Horizon.png")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(tableTop.Bounds().Dx())

	g := &Game{cardArea: ca, tableTop: tableTop}
	g.freeArea = FreeArea{cards: []*Card{MakeCard(img)}}

	if err := ebiten.RunGame(g); err != nil {
		log.Fatal(err)
	}
}